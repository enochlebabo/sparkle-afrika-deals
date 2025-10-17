import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { UserDashboard } from "@/components/dashboards/UserDashboard";
import { CashierDashboard } from "@/components/dashboards/CashierDashboard";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      await fetchUserRole(session.user.id);
    };

    checkAuth();
  }, [navigate]);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw error;
      setUserRole(data?.role || "user");
    } catch (error: any) {
      console.error("Error fetching role:", error);
      setUserRole("user"); // Default to user if error
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {userRole === "admin" && <AdminDashboard />}
        {userRole === "cashier" && <CashierDashboard />}
        {userRole === "user" && <UserDashboard />}
      </div>
    </div>
  );
}
