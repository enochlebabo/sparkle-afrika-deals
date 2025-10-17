import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, DollarSign } from "lucide-react";
import { toast } from "sonner";

export function UserDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          service_tiers (name, description)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = (booking: any) => {
    const receipt = `
DETAILEO CAR DETAILING
Receipt #${booking.id.slice(0, 8)}

Service: ${booking.service_tiers.name}
Date: ${new Date(booking.created_at).toLocaleDateString()}
Vehicle: ${booking.vehicle_type} (${booking.vehicle_size})
Payment: ${booking.payment_method.toUpperCase()}
${booking.discount_applied ? `Discount: -${booking.currency} ${booking.discount_amount.toFixed(2)}` : ''}
Total: ${booking.currency} ${booking.price.toFixed(2)}

Status: ${booking.status.toUpperCase()}
    `;

    const blob = new Blob([receipt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${booking.id.slice(0, 8)}.txt`;
    a.click();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">Manage your car detailing appointments</p>
        </div>
        <Button onClick={() => navigate("/")}>New Booking</Button>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No bookings yet. Book your first service!</p>
            <Button className="mt-4" onClick={() => navigate("/")}>
              Book Now
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{booking.service_tiers.name}</CardTitle>
                    <CardDescription>{booking.service_tiers.description}</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadReceipt(booking)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Receipt
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {booking.currency} {booking.price.toFixed(2)}
                      {booking.discount_applied && (
                        <span className="ml-2 text-accent text-xs">10% OFF</span>
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm capitalize px-2 py-1 bg-secondary rounded">
                      {booking.status}
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  {booking.vehicle_type} • {booking.vehicle_size} • {booking.payment_method}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
