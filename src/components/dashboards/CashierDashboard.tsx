import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CashierDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, revenue: 0 });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          service_tiers (name, description),
          profiles (full_name, phone)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);

      // Calculate stats
      const total = data?.length || 0;
      const pending = data?.filter(b => b.status === 'pending').length || 0;
      const completed = data?.filter(b => b.status === 'completed').length || 0;
      const revenue = data?.reduce((sum, b) => sum + Number(b.price), 0) || 0;

      setStats({ total, pending, completed, revenue });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);

      if (error) throw error;
      toast.success("Booking status updated");
      fetchBookings();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const updatePaymentStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ payment_status: newStatus })
        .eq("id", bookingId);

      if (error) throw error;
      toast.success("Payment status updated");
      fetchBookings();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Cashier Dashboard</h1>
        <p className="text-muted-foreground">Manage bookings and payments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Bookings</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed</CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.completed}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl">R {stats.revenue.toFixed(2)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>Manage customer bookings and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{booking.service_tiers.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Customer: {booking.profiles?.full_name || 'N/A'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Phone: {booking.profiles?.phone || 'N/A'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{booking.currency} {booking.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Booking Status</label>
                    <Select
                      value={booking.status}
                      onValueChange={(value) => updateBookingStatus(booking.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Payment Status</label>
                    <Select
                      value={booking.payment_status}
                      onValueChange={(value) => updatePaymentStatus(booking.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  {booking.vehicle_type} • {booking.vehicle_size} • {booking.payment_method}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
