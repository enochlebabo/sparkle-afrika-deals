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
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <p className="text-2xl font-bold text-primary">
          {currency} {basePrice.toFixed(2)}
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={onSelect} className="w-full transition-transform hover:scale-105">
          Select {name}
        </Button>
      </CardFooter>
    </Card>
  );
};
