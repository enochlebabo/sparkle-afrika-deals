import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import normalService from "@/assets/normal-service.jpg";
import premiumService from "@/assets/premium-service.jpg";
import vipService from "@/assets/vip-service.jpg";
import { Sparkles, Shield, Clock } from "lucide-react";

const SERVICE_IMAGES = {
  Normal: normalService,
  Premium: premiumService,
  VIP: vipService,
};

const Index = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<any[]>([]);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase.from("service_tiers").select("*").order("base_price");
    if (data) setServices(data);
  };

  const handleSelectService = (serviceId: string) => {
    navigate(`/book?service=${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/70" />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span className="text-accent">DETAILEO</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Africa's Premium Car Detailing Service
          </p>
          <Button size="lg" onClick={() => navigate("/auth?mode=signup")} className="bg-accent hover:bg-accent/90">
            Get Started
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">Professional detailing with attention to every detail</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Loyalty Rewards</h3>
              <p className="text-muted-foreground">Get 10% off on your 4th wash in a month</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-muted-foreground">Book online and show your digital receipt at the gate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground">
              Choose the perfect detailing package for your vehicle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                name={service.name}
                description={service.description}
                basePrice={service.base_price}
                features={service.features}
                image={SERVICE_IMAGES[service.name as keyof typeof SERVICE_IMAGES]}
                currency={currency}
                onSelect={() => handleSelectService(service.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
