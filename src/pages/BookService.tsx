import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "GH₵" },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£" },
];

const VEHICLE_TYPES = ["Sedan", "SUV", "Truck", "Van", "Luxury Car", "Sports Car"];
const VEHICLE_SIZES = ["Small", "Medium", "Large", "Extra Large"];

export default function BookService() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceTierId = searchParams.get("service");
  
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState<any>(null);
  const [currency, setCurrency] = useState("USD");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleSize, setVehicleSize] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [scheduledDate, setScheduledDate] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchService = async () => {
      if (!serviceTierId) {
        navigate("/");
        return;
      }

      const { data, error } = await supabase
        .from("service_tiers")
        .select("*")
        .eq("id", serviceTierId)
        .single();

      if (error || !data) {
        toast.error("Service not found");
        navigate("/");
        return;
      }

      setService(data);
    };

    fetchService();
  }, [serviceTierId, navigate]);

  useEffect(() => {
    if (!service || !vehicleSize) return;

    let multiplier = 1;
    if (vehicleSize === "Medium") multiplier = 1.3;
    else if (vehicleSize === "Large") multiplier = 1.6;
    else if (vehicleSize === "Extra Large") multiplier = 2;

    setPrice(Number(service.base_price) * multiplier);
  }, [service, vehicleSize]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please login to book a service");
        navigate("/auth");
        return;
      }

      // Check for loyalty discount
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const { data: recentBookings } = await supabase
        .from("bookings")
        .select("id")
        .eq("user_id", user.id)
        .gte("created_at", oneMonthAgo.toISOString())
        .eq("status", "completed");

      const isEligibleForDiscount = recentBookings && recentBookings.length === 3;
      const discountAmount = isEligibleForDiscount ? price * 0.1 : 0;
      const finalPrice = price - discountAmount;

      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        service_tier_id: serviceTierId,
        vehicle_type: vehicleType,
        vehicle_size: vehicleSize,
        price: finalPrice,
        currency,
        payment_method: paymentMethod,
        scheduled_date: scheduledDate,
        discount_applied: isEligibleForDiscount,
        discount_amount: discountAmount,
      });

      if (error) throw error;

      if (isEligibleForDiscount) {
        toast.success("Booking confirmed! 10% loyalty discount applied!");
      } else {
        toast.success("Booking confirmed!");
      }
      
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!service) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Book {service.name} Service</CardTitle>
            <CardDescription>Fill in your vehicle details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.symbol} {curr.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type</Label>
                <Select value={vehicleType} onValueChange={setVehicleType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    {VEHICLE_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleSize">Vehicle Size</Label>
                <Select value={vehicleSize} onValueChange={setVehicleSize} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle size" />
                  </SelectTrigger>
                  <SelectContent>
                    {VEHICLE_SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduledDate">Scheduled Date</Label>
                <Input
                  id="scheduledDate"
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Card Payment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash Payment</Label>
                  </div>
                </RadioGroup>
              </div>

              {price > 0 && (
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-lg font-semibold">
                    Total Price: {CURRENCIES.find(c => c.code === currency)?.symbol} {price.toFixed(2)}
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Booking..." : "Confirm Booking"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
