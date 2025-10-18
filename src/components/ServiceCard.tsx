import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ServiceCardProps {
  name: string;
  description: string;
  basePrice: number;
  features: string[];
  image: string;
  currency: string;
  onSelect: () => void;
}

export const ServiceCard = ({
  name,
  description,
  basePrice,
  features,
  image,
  currency,
  onSelect,
}: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 group border-2 hover:border-primary/30 bg-card">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={image}
          alt={`${name} car detailing service`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">{name}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
        <div className="pt-2">
          <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {currency} {basePrice.toFixed(2)}
          </p>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onSelect} 
          className="w-full transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
        >
          Select {name}
        </Button>
      </CardFooter>
    </Card>
  );
};
