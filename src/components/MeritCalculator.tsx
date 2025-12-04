import { useState } from "react";
import { Calculator, GraduationCap, BookOpen, Trophy, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MeritResult {
  aggregate: number;
  matricPercent: number;
  interPercent: number;
  testPercent: number;
}

export function MeritCalculator() {
  const [matricObtained, setMatricObtained] = useState("");
  const [matricTotal, setMatricTotal] = useState("1100");
  const [interObtained, setInterObtained] = useState("");
  const [interTotal, setInterTotal] = useState("1100");
  const [testObtained, setTestObtained] = useState("");
  const [testTotal, setTestTotal] = useState("100");
  const [formula, setFormula] = useState("40-40-20");
  const [result, setResult] = useState<MeritResult | null>(null);
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);

  const formulas = [
    { value: "40-40-20", label: "40% Matric + 40% Inter + 20% Test", description: "Most Engineering Universities" },
    { value: "50-40-10", label: "50% Inter + 40% Matric + 10% Test", description: "Medical Colleges (MDCAT)" },
    { value: "30-50-20", label: "30% Matric + 50% Inter + 20% Test", description: "Business Universities" },
    { value: "10-40-50", label: "10% Matric + 40% Inter + 50% Test", description: "Top Tier (LUMS, NUST)" },
  ];

  const calculateMerit = () => {
    const matric = (parseFloat(matricObtained) / parseFloat(matricTotal)) * 100;
    const inter = (parseFloat(interObtained) / parseFloat(interTotal)) * 100;
    const test = (parseFloat(testObtained) / parseFloat(testTotal)) * 100;

    const weights = formula.split("-").map(Number);
    const aggregate = (matric * weights[0] + inter * weights[1] + test * weights[2]) / 100;

    setResult({
      aggregate: Math.round(aggregate * 100) / 100,
      matricPercent: Math.round(matric * 100) / 100,
      interPercent: Math.round(inter * 100) / 100,
      testPercent: Math.round(test * 100) / 100,
    });
  };

  const isFormValid =
    matricObtained && matricTotal && interObtained && interTotal && testObtained && testTotal;

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Merit Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Calculate Your Admission Merit
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter your marks and select your desired formula to calculate your aggregate merit score for Pakistani universities.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2">
            <CardContent className="p-6 sm:p-8">
              <div className="grid gap-8">
                {/* Formula Selection */}
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Merit Formula
                  </label>
                  <button
                    onClick={() => setIsFormulaOpen(!isFormulaOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 border-input bg-card hover:border-primary transition-colors"
                  >
                    <div className="text-left">
                      <div className="font-medium text-foreground">
                        {formulas.find((f) => f.value === formula)?.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formulas.find((f) => f.value === formula)?.description}
                      </div>
                    </div>
                    <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", isFormulaOpen && "rotate-180")} />
                  </button>
                  
                  {isFormulaOpen && (
                    <div className="absolute z-10 w-full mt-2 py-2 rounded-lg border-2 border-border bg-card shadow-lg animate-scale-in">
                      {formulas.map((f) => (
                        <button
                          key={f.value}
                          onClick={() => {
                            setFormula(f.value);
                            setIsFormulaOpen(false);
                          }}
                          className={cn(
                            "w-full px-4 py-3 text-left hover:bg-secondary transition-colors",
                            formula === f.value && "bg-primary/10"
                          )}
                        >
                          <div className="font-medium text-foreground">{f.label}</div>
                          <div className="text-sm text-muted-foreground">{f.description}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input Fields */}
                <div className="grid sm:grid-cols-3 gap-6">
                  {/* Matric */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <BookOpen className="w-5 h-5" />
                      <span className="font-semibold">Matriculation</span>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Obtained Marks</label>
                      <Input
                        type="number"
                        placeholder="e.g., 990"
                        value={matricObtained}
                        onChange={(e) => setMatricObtained(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Total Marks</label>
                      <Input
                        type="number"
                        placeholder="e.g., 1100"
                        value={matricTotal}
                        onChange={(e) => setMatricTotal(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Intermediate */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <GraduationCap className="w-5 h-5" />
                      <span className="font-semibold">Intermediate</span>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Obtained Marks</label>
                      <Input
                        type="number"
                        placeholder="e.g., 980"
                        value={interObtained}
                        onChange={(e) => setInterObtained(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Total Marks</label>
                      <Input
                        type="number"
                        placeholder="e.g., 1100"
                        value={interTotal}
                        onChange={(e) => setInterTotal(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Entry Test */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Trophy className="w-5 h-5" />
                      <span className="font-semibold">Entry Test</span>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Obtained Marks</label>
                      <Input
                        type="number"
                        placeholder="e.g., 85"
                        value={testObtained}
                        onChange={(e) => setTestObtained(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Total Marks</label>
                      <Input
                        type="number"
                        placeholder="e.g., 100"
                        value={testTotal}
                        onChange={(e) => setTestTotal(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  variant="hero"
                  size="xl"
                  className="w-full sm:w-auto sm:mx-auto"
                  onClick={calculateMerit}
                  disabled={!isFormValid}
                >
                  <Calculator className="w-5 h-5" />
                  Calculate Merit
                </Button>

                {/* Results */}
                {result && (
                  <div className="grid sm:grid-cols-4 gap-4 pt-6 border-t border-border animate-fade-in-up">
                    <Card className="bg-secondary/50 border-0">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-display font-bold text-foreground">
                          {result.matricPercent}%
                        </div>
                        <div className="text-sm text-muted-foreground">Matric</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-secondary/50 border-0">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-display font-bold text-foreground">
                          {result.interPercent}%
                        </div>
                        <div className="text-sm text-muted-foreground">Intermediate</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-secondary/50 border-0">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-display font-bold text-foreground">
                          {result.testPercent}%
                        </div>
                        <div className="text-sm text-muted-foreground">Entry Test</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-hero border-0 shadow-glow">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-display font-bold text-primary-foreground">
                          {result.aggregate}%
                        </div>
                        <div className="text-sm text-primary-foreground/80">Aggregate Merit</div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
