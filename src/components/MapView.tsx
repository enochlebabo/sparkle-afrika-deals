import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin } from "lucide-react";

interface Location {
  name: string;
  coordinates: [number, number];
  type: string;
}

const locations: Location[] = [
  // South Africa Provinces
  { name: "Gauteng - Johannesburg", coordinates: [28.0473, -26.2041], type: "province" },
  { name: "Western Cape - Cape Town", coordinates: [18.4241, -33.9249], type: "province" },
  { name: "KwaZulu-Natal - Durban", coordinates: [31.0218, -29.8587], type: "province" },
  { name: "Eastern Cape - Port Elizabeth", coordinates: [25.6022, -33.9608], type: "province" },
  { name: "Free State - Bloemfontein", coordinates: [26.2023, -29.0852], type: "province" },
  { name: "Limpopo - Polokwane", coordinates: [29.4687, -23.9045], type: "province" },
  { name: "Mpumalanga - Nelspruit", coordinates: [30.9782, -25.4753], type: "province" },
  { name: "North West - Mahikeng", coordinates: [25.6447, -25.8601], type: "province" },
  { name: "Northern Cape - Kimberley", coordinates: [24.7622, -28.7282], type: "province" },
  
  // Lesotho Districts
  { name: "Maseru District", coordinates: [27.4833, -29.3167], type: "district" },
  { name: "Berea District", coordinates: [27.7833, -29.2167], type: "district" },
  { name: "Leribe District", coordinates: [28.0500, -28.8667], type: "district" },
  { name: "Mafeteng District", coordinates: [27.2333, -29.8167], type: "district" },
  { name: "Mohale's Hoek District", coordinates: [27.4667, -30.1500], type: "district" },
  { name: "Mokhotlong District", coordinates: [29.0667, -29.2667], type: "district" },
  { name: "Qacha's Nek District", coordinates: [28.6833, -30.1167], type: "district" },
  { name: "Quthing District", coordinates: [27.7000, -30.4000], type: "district" },
  { name: "Thaba-Tseka District", coordinates: [28.6167, -29.5167], type: "district" },
  { name: "Butha-Buthe District", coordinates: [28.2500, -28.7667], type: "district" },
];

export const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [27.5, -28.5],
      zoom: 5.5,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("load", () => {
      locations.forEach((location) => {
        const el = document.createElement("div");
        el.className = "custom-marker";
        el.style.width = "30px";
        el.style.height = "30px";
        el.style.borderRadius = "50%";
        el.style.backgroundColor = location.type === "province" ? "#D97706" : "#059669";
        el.style.border = "3px solid white";
        el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
        el.style.cursor = "pointer";

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div style="padding: 8px;">
            <h3 style="font-weight: bold; margin-bottom: 4px;">${location.name}</h3>
            <p style="color: #666; font-size: 12px;">${location.type === "province" ? "South Africa" : "Lesotho"}</p>
          </div>`
        );

        new mapboxgl.Marker(el)
          .setLngLat(location.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    });
  };

  const handleTokenSubmit = () => {
    if (tokenInput.trim()) {
      setMapboxToken(tokenInput);
      setShowTokenInput(false);
      initializeMap(tokenInput);
    }
  };

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      {showTokenInput ? (
        <div className="absolute inset-0 bg-card z-10 flex flex-col items-center justify-center p-8">
          <Alert className="mb-6 max-w-md">
            <MapPin className="h-4 w-4" />
            <AlertDescription>
              To view the locations map, please enter your Mapbox public token. Get one free at{" "}
              <a
                href="https://mapbox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                mapbox.com
              </a>
            </AlertDescription>
          </Alert>
          <div className="flex gap-2 max-w-md w-full">
            <Input
              type="text"
              placeholder="Enter Mapbox token (pk.ey...)"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTokenSubmit}>Load Map</Button>
          </div>
        </div>
      ) : (
        <div ref={mapContainer} className="absolute inset-0" />
      )}
    </div>
  );
};
