import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Car, LogOut, User as UserIcon, Menu, Home, Info, MapPin, Calendar, Phone, HelpCircle, DollarSign } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Info, label: "About Us", path: "/about" },
    { icon: MapPin, label: "Locations", path: "/locations" },
    { icon: Calendar, label: "Book Service", path: "/book" },
    { icon: DollarSign, label: "Services & Pricing", path: "/#services" },
    { icon: Phone, label: "Contact", path: "/#contact" },
    { icon: HelpCircle, label: "FAQ", path: "/#faq" },
  ];

  return (
    <nav className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Car className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            DETAILEO
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          {user && (
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="hidden sm:flex">
              <UserIcon className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Car className="h-6 w-6 text-primary" />
                  DETAILEO Menu
                </SheetTitle>
                <SheetDescription>
                  Navigate through our services
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 space-y-6">
                {/* Navigation Links */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground px-2">Navigation</h3>
                  {menuItems.map((item) => (
                    <Button
                      key={item.path}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        if (item.path.includes("#")) {
                          const [path, hash] = item.path.split("#");
                          navigate(path);
                          setTimeout(() => {
                            document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        } else {
                          navigate(item.path);
                        }
                      }}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.label}
                    </Button>
                  ))}
                </div>

                <Separator />

                {/* User Actions */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground px-2">Account</h3>
                  {user ? (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start sm:hidden"
                        onClick={() => navigate("/dashboard")}
                      >
                        <UserIcon className="h-4 w-4 mr-3" />
                        Dashboard
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-destructive hover:text-destructive"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => navigate("/auth")}
                      >
                        Login
                      </Button>
                      <Button
                        className="w-full"
                        onClick={() => navigate("/auth?mode=signup")}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>

                <Separator />

                {/* Quick Info */}
                <div className="space-y-2 px-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">Contact</h3>
                  <div className="text-sm space-y-1">
                    <p className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      +27 123 456 789
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      +266 5000 0000
                    </p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
