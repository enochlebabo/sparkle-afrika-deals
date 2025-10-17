import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, Calendar, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [serviceTiers, setServiceTiers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select(`
          *,
          service_tiers (name),
          profiles (full_name, phone)
        `)
        .order("created_at", { ascending: false });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);

      // Fetch profiles (users)
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) throw profilesError;
      setUsers(profilesData || []);

      // Fetch service tiers
      const { data: tiersData, error: tiersError } = await supabase
        .from("service_tiers")
        .select("*");

      if (tiersError) throw tiersError;
      setServiceTiers(tiersData || []);

      // Calculate stats
      const totalUsers = profilesData?.length || 0;
      const totalBookings = bookingsData?.length || 0;
      const totalRevenue = bookingsData?.reduce((sum, b) => sum + Number(b.price), 0) || 0;
      const pendingBookings = bookingsData?.filter(b => b.status === 'pending').length || 0;

      setStats({ totalUsers, totalBookings, totalRevenue, pendingBookings });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Users
            </CardDescription>
            <CardTitle className="text-3xl">{stats.totalUsers}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Total Bookings
            </CardDescription>
            <CardTitle className="text-3xl">{stats.totalBookings}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Revenue
            </CardDescription>
            <CardTitle className="text-3xl">R {stats.totalRevenue.toFixed(2)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Pending
            </CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{stats.pendingBookings}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest booking activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bookings.slice(0, 10).map((booking) => (
                  <div key={booking.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">{booking.service_tiers.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.profiles?.full_name || 'Unknown'} • {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{booking.currency} {booking.price.toFixed(2)}</p>
                      <p className="text-sm capitalize">{booking.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">{user.full_name || 'No name'}</p>
                      <p className="text-sm text-muted-foreground">{user.phone || 'No phone'}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Joined {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Tiers</CardTitle>
              <CardDescription>Available service packages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceTiers.map((tier) => (
                  <div key={tier.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{tier.name}</h3>
                      <p className="font-bold">R {tier.base_price}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{tier.description}</p>
                    {tier.features && (
                      <ul className="text-sm space-y-1">
                        {tier.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-primary">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
