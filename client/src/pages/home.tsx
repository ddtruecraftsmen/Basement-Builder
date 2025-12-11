import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Calculator, 
  Hammer, 
  Layers, 
  PaintBucket, 
  Grid3X3, 
  ArrowRight,
  Ruler,
  Info,
  DollarSign,
  Download,
  Share2,
  Loader2
} from "lucide-react";
import blueprintBg from "@assets/generated_images/subtle_architectural_grid_background.png";
import { motion } from "framer-motion";

const formSchema = z.object({
  length: z.coerce.number().min(1, "Length must be at least 1 ft"),
  width: z.coerce.number().min(1, "Width must be at least 1 ft"),
  height: z.coerce.number().min(6, "Height must be at least 6 ft").default(8),
  waste: z.coerce.number().min(0, "Waste must be positive").max(100, "Max 100%").default(10),
});

type FormValues = z.infer<typeof formSchema>;

interface CalculationResults {
  perimeter: number;
  wallArea: number;
  floorArea: number;
  studs: number;
  plates: number;
  drywallSheets: number;
  flooringSheets: number;
  paintGallons: number;
  insulationRolls: number;
  insulationBatts: number;
}

type MaterialPrice = {
  studs: number;
  plates: number;
  drywallSheets: number;
  insulationRolls: number;
  insulationBatts: number;
  flooringSheets: number;
  paintGallons: number;
  primerGallons: number;
};

function HomeCalculatorIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      {/* Square Root */}
      <path d="M7 15l3 3l5 -7h4" />
    </svg>
  )
}

export default function Home() {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [prices, setPrices] = useState<MaterialPrice>({
    studs: 4.50,
    plates: 6.00, // Estimated 2x4x10
    drywallSheets: 13.00,
    insulationRolls: 25.00, // Est R13 Roll
    insulationBatts: 55.00, // Est R13 Bag
    flooringSheets: 25.00, // 4x8 Plywood/OSB
    paintGallons: 45.00,
    primerGallons: 30.00,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      length: 20,
      width: 15,
      height: 8,
      waste: 10,
    },
  });

  function calculate(values: FormValues) {
    setIsCalculating(true);
    setResults(null);

    // Simulate "crunching numbers" delay for polish
    setTimeout(() => {
      const wasteFactor = 1 + (values.waste / 100);
      
      const perimeter = (values.length + values.width) * 2;
      const wallArea = perimeter * values.height;
      const floorArea = values.length * values.width;

      // Framing: 16" OC spacing (1.33 ft) + corners. 
      const baseStuds = (perimeter / 1.333) + 4;
      const studCount = Math.ceil(baseStuds * wasteFactor);

      // Plates: 3 rows (2 top, 1 bottom)
      const plateLinearFeet = perimeter * 3;
      const plateCount = Math.ceil((plateLinearFeet / 10) * wasteFactor); // 10ft boards

      // Drywall: 4x8 sheets (32 sq ft)
      const drywallSheets = Math.ceil((wallArea / 32) * wasteFactor);

      // Flooring: 4x8 Sheets (32 sq ft) - Plywood/OSB
      const flooringSheets = Math.ceil((floorArea / 32) * wasteFactor);

      // Paint: 350 sq ft per gallon (1 coat). 
      const paintGallons = Math.ceil((wallArea / 350) * 2); // 2 coats. 

      // Insulation
      const insulationRolls = Math.ceil((wallArea / 40) * wasteFactor);
      const insulationBatts = Math.ceil((wallArea / 40) * wasteFactor);

      setResults({
        perimeter,
        wallArea,
        floorArea,
        studs: studCount,
        plates: plateCount,
        drywallSheets,
        flooringSheets,
        paintGallons,
        insulationRolls,
        insulationBatts
      });
      setIsCalculating(false);
    }, 600);
  }

  const updatePrice = (key: keyof MaterialPrice, value: string) => {
    const numValue = parseFloat(value) || 0;
    setPrices(prev => ({ ...prev, [key]: numValue }));
  };

  const totalCost = useMemo(() => {
    if (!results) return 0;
    return (
      (results.studs * prices.studs) +
      (results.plates * prices.plates) +
      (results.drywallSheets * prices.drywallSheets) +
      (results.insulationRolls * prices.insulationRolls) +
      (results.insulationBatts * prices.insulationBatts) +
      (results.flooringSheets * prices.flooringSheets) +
      (results.paintGallons * prices.paintGallons) +
      (Math.ceil(results.paintGallons / 2) * prices.primerGallons)
    );
  }, [results, prices]);

  const shareResults = async () => {
    if (!results) return;
    
    const text = `Check out my basement reno calc: ${results.studs} studs, $${totalCost.toFixed(2)} est. total for a ${form.getValues().length}x${form.getValues().width} room! Built by D&D True Craftsmen.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RenoCalc Pro Results',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(text + ' ' + window.location.href)
        .then(() => alert('Copied to clipboard!'));
    }
  };

  const downloadCSV = () => {
    if (!results) return;

    const primerGallons = Math.ceil(results.paintGallons / 2);

    const data = [
      ["Material", "Quantity", "Unit", "Unit Price", "Total Cost"],
      ["2x4 Studs (8ft)", results.studs, "pcs", prices.studs, results.studs * prices.studs],
      ["2x4 Plates (10ft)", results.plates, "pcs", prices.plates, results.plates * prices.plates],
      ["4x8 Drywall Sheets", results.drywallSheets, "sheets", prices.drywallSheets, results.drywallSheets * prices.drywallSheets],
      ["Insulation (Rolls)", results.insulationRolls, "rolls", prices.insulationRolls, results.insulationRolls * prices.insulationRolls],
      ["Insulation (Batts)", results.insulationBatts, "bags", prices.insulationBatts, results.insulationBatts * prices.insulationBatts],
      ["4x8 Plywood/OSB", results.flooringSheets, "sheets", prices.flooringSheets, results.flooringSheets * prices.flooringSheets],
      ["Paint (2 coats)", results.paintGallons, "gallons", prices.paintGallons, results.paintGallons * prices.paintGallons],
      ["Primer", primerGallons, "gallons", prices.primerGallons, primerGallons * prices.primerGallons],
      ["", "", "", "TOTAL ESTIMATE", totalCost]
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
      + data.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "renovation_estimate.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground relative overflow-hidden flex flex-col">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none z-0 mix-blend-multiply"
        style={{
          backgroundImage: `url(${blueprintBg})`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      {/* Header */}
      <header className="relative z-10 border-b bg-card/80 backdrop-blur-sm sticky top-0">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2">
              <HomeCalculatorIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight uppercase">RenoCalc <span className="text-primary">Pro</span></h1>
              <p className="text-xs text-muted-foreground font-mono tracking-wider">RENOVATION MATERIAL ESTIMATOR</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex font-mono text-xs gap-2">
            <Info className="h-3 w-3" />
            V1.0.0
          </Button>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex-grow">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Input Section */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-2 shadow-lg">
                <CardHeader className="bg-muted/50 border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Ruler className="h-5 w-5 text-primary" />
                    Room Dimensions
                  </CardTitle>
                  <CardDescription>Enter the finished measurements of your basement room.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(calculate)} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="length"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-mono text-xs uppercase text-muted-foreground">Length (ft)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} className="font-mono text-lg bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="width"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-mono text-xs uppercase text-muted-foreground">Width (ft)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} className="font-mono text-lg bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="height"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-mono text-xs uppercase text-muted-foreground">Ceiling Height (ft)</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.5" {...field} className="font-mono text-lg bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="waste"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-mono text-xs uppercase text-muted-foreground">Waste Factor (%)</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input type="number" {...field} className="font-mono text-lg bg-background pr-8" />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full font-bold uppercase tracking-wide text-md h-12" disabled={isCalculating}>
                        {isCalculating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...
                          </>
                        ) : (
                          <>
                            Calculate Materials <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-card border p-4 text-sm text-muted-foreground"
            >
              <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" /> Estimation Logic
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-xs mb-4">
                <li>Studs calculated at 16" on-center + corners.</li>
                <li>Drywall & Flooring include waste factor.</li>
                <li>Paint assumes 2 coats on fresh drywall.</li>
              </ul>
              
              <div className="bg-primary/10 border-l-4 border-primary p-3 rounded-r text-xs">
                <span className="font-bold text-primary block mb-1">Pro Tip:</span>
                This covers walls & floors only—add 10-15% extra for doors/windows/cuts. Built by D&D True Craftsmen (15+ years in basements).
              </div>
            </motion.div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8">
            {isCalculating ? (
               <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12">
                 <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                 <h3 className="text-xl font-bold">Crunching numbers...</h3>
                 <p className="text-muted-foreground">Generating your material list</p>
               </div>
            ) : results ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-card border p-4 flex flex-col items-center justify-center text-center shadow-sm">
                    <span className="text-xs text-muted-foreground uppercase font-mono mb-1">Total Perimeter</span>
                    <span className="text-2xl font-bold font-mono">{results.perimeter} <span className="text-sm font-normal text-muted-foreground">ft</span></span>
                  </div>
                  <div className="bg-card border p-4 flex flex-col items-center justify-center text-center shadow-sm">
                    <span className="text-xs text-muted-foreground uppercase font-mono mb-1">Wall Area</span>
                    <span className="text-2xl font-bold font-mono">{results.wallArea} <span className="text-sm font-normal text-muted-foreground">sq ft</span></span>
                  </div>
                  <div className="bg-card border p-4 flex flex-col items-center justify-center text-center shadow-sm">
                    <span className="text-xs text-muted-foreground uppercase font-mono mb-1">Floor Area</span>
                    <span className="text-2xl font-bold font-mono">{results.floorArea} <span className="text-sm font-normal text-muted-foreground">sq ft</span></span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold tracking-tight">Material Requirements & Cost</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                    <DollarSign className="h-4 w-4" />
                    <span>Enter unit prices to calculate total</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Framing */}
                  <MaterialCard 
                    icon={Hammer}
                    title="Framing Lumber"
                    color="text-orange-500"
                    items={[
                      { 
                        label: "2x4 Studs (8ft)", 
                        value: results.studs, 
                        unit: "pcs", 
                        priceKey: "studs" 
                      },
                      { 
                        label: "2x4 Plates (10ft)", 
                        value: results.plates, 
                        unit: "pcs", 
                        priceKey: "plates" 
                      },
                    ]}
                    prices={prices}
                    onPriceChange={updatePrice}
                  />

                  {/* Drywall */}
                  <MaterialCard 
                    icon={Layers}
                    title="Drywall & Insulation"
                    color="text-blue-500"
                    items={[
                      { label: "4x8 Drywall Sheets", value: results.drywallSheets, unit: "sheets", priceKey: "drywallSheets" },
                      { label: "R13 Insulation Rolls", value: results.insulationRolls, unit: "rolls", priceKey: "insulationRolls" },
                      { label: "R13 Insulation Batts", value: results.insulationBatts, unit: "bags", priceKey: "insulationBatts" },
                    ]}
                    prices={prices}
                    onPriceChange={updatePrice}
                  />

                  {/* Flooring */}
                  <MaterialCard 
                    icon={Grid3X3}
                    title="Flooring"
                    color="text-emerald-500"
                    items={[
                      { label: "4x8 Plywood/OSB", value: results.flooringSheets, unit: "sheets", priceKey: "flooringSheets" },
                    ]}
                    prices={prices}
                    onPriceChange={updatePrice}
                  />

                  {/* Paint */}
                  <MaterialCard 
                    icon={PaintBucket}
                    title="Finishing"
                    color="text-purple-500"
                    items={[
                      { label: "Wall Paint (2 coats)", value: results.paintGallons, unit: "gallons", priceKey: "paintGallons" },
                      { label: "Primer (1 coat)", value: Math.ceil(results.paintGallons / 2), unit: "gallons", priceKey: "primerGallons" },
                    ]}
                    prices={prices}
                    onPriceChange={updatePrice}
                  />
                </div>

                {/* Total Cost Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-8"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        Estimated Project Cost
                      </h3>
                      <p className="text-sm text-muted-foreground">Based on provided unit prices</p>
                    </div>
                    <div className="text-4xl font-mono font-bold text-primary">
                      ${totalCost.toFixed(2)}
                    </div>
                  </div>
                  
                  <Separator className="my-4 bg-primary/10" />
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={downloadCSV} 
                      className="flex-1 flex items-center gap-2" 
                      variant="outline"
                    >
                      <Download className="h-4 w-4" />
                      Download CSV Estimate
                    </Button>
                    <Button 
                      onClick={shareResults} 
                      className="flex-1 flex items-center gap-2" 
                      variant="outline"
                    >
                      <Share2 className="h-4 w-4" />
                      Share List
                    </Button>
                  </div>
                </motion.div>

              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg bg-muted/20">
                <div className="bg-muted p-4 rounded-full mb-4">
                  <Calculator className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ready to Calculate</h3>
                <p className="text-muted-foreground max-w-md">
                  Enter your room dimensions on the left to generate a comprehensive material list for your renovation project.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="relative z-10 border-t bg-card/50 py-6 text-center text-sm text-muted-foreground">
        <p>Built by pros for pros. Questions? Hit us up at <span className="font-semibold text-foreground">D&D True Craftsmen</span>.</p>
      </footer>
    </div>
  );
}

function MaterialCard({ icon: Icon, title, color, items, prices, onPriceChange }: { 
  icon: any, 
  title: string, 
  color: string, 
  items: { label: string, value: number, unit: string, priceKey: keyof MaterialPrice }[],
  prices: MaterialPrice,
  onPriceChange: (key: keyof MaterialPrice, value: string) => void
}) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-l-4" style={{ borderLeftColor: 'currentColor' }}>
      <CardHeader className="bg-muted/30 pb-3">
        <CardTitle className="flex items-center gap-2 text-md">
          <Icon className={`h-5 w-5 ${color}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="space-y-2 border-b border-dashed last:border-0 pb-3 last:pb-0">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground font-medium">{item.label}</span>
                <span className="font-mono font-bold text-lg">
                  {item.value} <span className="text-xs font-normal text-muted-foreground">{item.unit}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="h-8 pl-5 text-xs font-mono bg-background/50"
                    min="0"
                    step="0.01"
                    value={prices[item.priceKey] || ''}
                    onChange={(e) => onPriceChange(item.priceKey, e.target.value)}
                  />
                </div>
                <div className="text-xs font-mono text-muted-foreground w-16 text-right">
                  ${((prices[item.priceKey] || 0) * item.value).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
