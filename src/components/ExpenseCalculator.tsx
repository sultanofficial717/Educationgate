import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, DollarSign } from "lucide-react";

const countries = [
  { name: "United Kingdom", baseCost: 25000, currency: "GBP" },
  { name: "United States", baseCost: 35000, currency: "USD" },
  { name: "Canada", baseCost: 22000, currency: "CAD" },
  { name: "Australia", baseCost: 28000, currency: "AUD" },
  { name: "Germany", baseCost: 12000, currency: "EUR" },
  { name: "China", baseCost: 8000, currency: "CNY" },
];

const levels = [
  { id: "undergraduate", label: "Undergraduate", multiplier: 1 },
  { id: "masters", label: "Masters", multiplier: 1.2 },
  { id: "phd", label: "PhD", multiplier: 1.1 },
];

const housingOptions = [
  { id: "on-campus", label: "On-Campus Housing", cost: 10000 },
  { id: "off-campus", label: "Off-Campus Housing", cost: 8000 },
  { id: "family", label: "Living with Family", cost: 2000 },
];

export function ExpenseCalculator() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [level, setLevel] = useState("");
  const [housing, setHousing] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const selectedCountry = countries.find((c) => c.name === country);
    const selectedLevel = levels.find((l) => l.id === level);
    const selectedHousing = housingOptions.find((h) => h.id === housing);

    if (selectedCountry && selectedLevel && selectedHousing) {
      const tuition = selectedCountry.baseCost * selectedLevel.multiplier;
      const total = tuition + selectedHousing.cost;
      setResult(Math.round(total));
    }
  };

  const reset = () => {
    setResult(null);
    setCountry("");
    setCity("");
    setLevel("");
    setHousing("");
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if(!val) reset(); }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2">
          <Calculator className="w-5 h-5" />
          Expense Calculator
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Study Abroad Expense Calculator</DialogTitle>
          <DialogDescription>
            Estimate your annual tuition and living expenses based on your study destination and preferences.
          </DialogDescription>
        </DialogHeader>
        
        {!result ? (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="level">Opportunity Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((l) => (
                    <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                placeholder="e.g. London, New York" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="housing">Accommodation Preference</Label>
              <Select value={housing} onValueChange={setHousing}>
                <SelectTrigger id="housing">
                  <SelectValue placeholder="Select accommodation" />
                </SelectTrigger>
                <SelectContent>
                  {housingOptions.map((h) => (
                    <SelectItem key={h.id} value={h.id}>{h.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-muted-foreground">Estimated Annual Cost</h3>
              <p className="text-4xl font-bold text-foreground mt-2">
                {countries.find(c => c.name === country)?.currency} {result.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                for {levels.find(l => l.id === level)?.label} in {city || country}
              </p>
            </div>
            <div className="text-xs text-muted-foreground bg-muted p-3 rounded-md">
              *This is an approximation including tuition and living costs. Actual costs may vary.
            </div>
          </div>
        )}

        <DialogFooter>
          {!result ? (
            <Button onClick={handleCalculate} disabled={!country || !level || !housing} className="w-full">
              Calculate Expense
            </Button>
          ) : (
            <Button onClick={reset} variant="outline" className="w-full">
              Calculate Again
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
