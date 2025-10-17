import { Link } from "react-router-dom";
import { Car, Facebook, Instagram, Twitter, Mail, Phone, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                DETAILEO
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Africa's premier car detailing service, bringing professional care to every vehicle.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Book Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                info@detaileo.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                +27 123 456 789
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <h3 className="font-semibold mb-4">Download App</h3>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href="#" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Get Mobile App
              </a>
            </Button>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground space-y-2">
          <p>&copy; {new Date().getFullYear()} DETAILEO. All rights reserved.</p>
          <p className="text-xs">Sponsored by <span className="font-semibold text-foreground">MRCHAPTER_VERSE HOLDINGS</span></p>
        </div>
      </div>
    </footer>
  );
};
