import { Navbar } from "@/components/Navbar";
import { MapView } from "@/components/MapView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const Locations = () => {
  const southAfricaProvinces = [
    "Gauteng - Johannesburg",
    "Western Cape - Cape Town", 
    "KwaZulu-Natal - Durban",
    "Eastern Cape - Port Elizabeth",
    "Free State - Bloemfontein",
    "Limpopo - Polokwane",
    "Mpumalanga - Nelspruit",
    "North West - Mahikeng",
    "Northern Cape - Kimberley"
  ];

  const lesothoDistricts = [
    "Maseru District",
    "Berea District",
    "Leribe District",
    "Mafeteng District",
    "Mohale's Hoek District",
    "Mokhotlong District",
    "Qacha's Nek District",
    "Quthing District",
    "Thaba-Tseka District",
    "Butha-Buthe District"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Our Locations
        </h1>
        
        <p className="text-xl text-muted-foreground text-center mb-12">
          DETAILEO serves customers across Southern Africa
        </p>

        <div className="mb-12">
          <MapView />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                South Africa - Provinces
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {southAfricaProvinces.map((province) => (
                  <li 
                    key={province}
                    className="flex items-start gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>{province}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-accent" />
                Lesotho - Districts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {lesothoDistricts.map((district) => (
                  <li 
                    key={district}
                    className="flex items-start gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>{district}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Can't find your location?</h3>
              <p className="text-muted-foreground">
                We're constantly expanding our service areas. Contact us to check if we can serve your area or to request service in a new location.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Locations;
