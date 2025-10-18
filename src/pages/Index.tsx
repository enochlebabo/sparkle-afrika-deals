import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
      <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-accent/75" />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center text-white py-20">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in opacity-0" style={{ animationDelay: '200ms' }}>
            Welcome to <span className="bg-gradient-to-r from-accent to-yellow-400 bg-clip-text text-transparent">DETAILEO</span>
          </h1>
          <p className="text-xl md:text-3xl mb-4 max-w-3xl mx-auto font-light animate-slide-up opacity-0" style={{ animationDelay: '400ms' }}>
            Africa's Premier Car Detailing Service
          </p>
          <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-white/90 animate-slide-up opacity-0" style={{ animationDelay: '500ms' }}>
            Professional detailing with loyalty rewards • Get 10% off on your 4th wash
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/auth?mode=signup")} 
            className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105 animate-scale-in opacity-0"
            style={{ animationDelay: '700ms' }}
          >
            Book Your Service Now
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6 rounded-2xl bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up opacity-0" style={{ animationDelay: '100ms' }}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full mb-6 transition-transform hover:scale-110 shadow-lg">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Premium Quality</h3>
              <p className="text-muted-foreground text-lg">Professional detailing with attention to every detail</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up opacity-0" style={{ animationDelay: '300ms' }}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-accent/70 rounded-full mb-6 transition-transform hover:scale-110 shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Loyalty Rewards</h3>
              <p className="text-muted-foreground text-lg">Get 10% off on your 4th wash in a month</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up opacity-0" style={{ animationDelay: '500ms' }}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full mb-6 transition-transform hover:scale-110 shadow-lg">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Easy Booking</h3>
              <p className="text-muted-foreground text-lg">Book online and show your digital receipt at the gate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
              Our Services
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '200ms' }}>
              Choose the perfect detailing package for your vehicle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="animate-scale-in opacity-0"
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
              >
                <ServiceCard
                  name={service.name}
                  description={service.description}
                  basePrice={service.base_price}
                  features={service.features}
                  image={SERVICE_IMAGES[service.name as keyof typeof SERVICE_IMAGES]}
                  currency={currency}
                  onSelect={() => handleSelectService(service.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
