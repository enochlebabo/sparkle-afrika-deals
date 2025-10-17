import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Users, Award, Globe, Facebook, Instagram, Twitter, Mail } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About DETAILEO
          </h1>
          
          <p className="text-xl text-muted-foreground text-center mb-12">
            Africa's Premier Car Detailing Service
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6">
                <Car className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide world-class car detailing services across Africa, making premium vehicle care accessible and affordable for everyone.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Our Team</h3>
                <p className="text-muted-foreground">
                  A dedicated team of over 200 professional detailers trained in the latest automotive care techniques, serving customers across Southern Africa.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Our Excellence</h3>
                <p className="text-muted-foreground">
                  Award-winning service with a commitment to quality, using eco-friendly products and sustainable practices in all our detailing services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Our Reach</h3>
                <p className="text-muted-foreground">
                  Operating in South Africa and Lesotho, with plans to expand across the continent, bringing professional car care to every corner of Africa.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-3xl font-bold mb-6 text-center">Our Story</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2020, DETAILEO began with a simple vision: to revolutionize car care in Africa. What started as a single location in Johannesburg has grown into a network serving thousands of customers across Southern Africa.
                </p>
                <p>
                  We understand the unique challenges of maintaining vehicles in African climates and conditions. Our specialized services are designed to protect and enhance your vehicle, whether you're navigating dusty rural roads or urban city streets.
                </p>
                <p>
                  Today, we're proud to offer three tiers of service - Normal, Premium, and VIP - ensuring there's a perfect solution for every vehicle and every budget. Our loyalty program rewards our regular customers, because we believe in building lasting relationships with the people we serve.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
            <div className="flex justify-center gap-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook className="h-8 w-8" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram className="h-8 w-8" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Twitter className="h-8 w-8" />
              </a>
              <a href="mailto:info@detaileo.com" className="hover:text-primary transition-colors">
                <Mail className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
