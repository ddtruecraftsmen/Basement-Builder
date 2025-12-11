import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Info
} from "lucide-react";
import blueprintBg from "@assets/generated_images/subtle_architectural_grid_background.png";
import { motion } from "framer-motion";

const formSchema = z.object({
  length: z.coerce.number().min(1, "Length must be at least 1 ft"),
  width: z.coerce.number().min(1, "Width must be at least 1 ft"),
  height: z.coerce.number().min(6, "Height must be at least 6 ft").default(8),
});

type FormValues = z.infer<typeof formSchema>;

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
  const [results, setResults] = useState<{
    perimeter: number;
    wallArea: number;
    floorArea: number;
    studs: number;
    plates: number;
    drywallSheets: number;
    flooringSqFt: number;
    paintGallons: number;
    insulationRolls: number;
    insulationBatts: number;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      length: 20,
      width: 15,
      height: 8,
    },
  });

  function calculate(values: FormValues) {
    const perimeter = (values.length + values.width) * 2;
    const wallArea = perimeter * values.height;
    const floorArea = values.length * values.width;

    // Framing: 16" OC spacing (1.33 ft) + 10% waste/corners/openings
    // Rule of thumb: 1 stud per linear foot covers spacing + corners + headers roughly
    const studCount = Math.ceil(perimeter) + 4; // Simple rule: 1 per foot + 4 corners

    // Plates: 3 rows (2 top, 1 bottom) using 10ft boards usually, or just linear footage
    // Let's output linear feet of plate material needed
    const plateLinearFeet = perimeter * 3;
    const plateCount = Math.ceil(plateLinearFeet / 10); // Assuming 10ft lumber for plates

    // Drywall: 4x8 sheets (32 sq ft). Add 10% waste.
    const drywallSheets = Math.ceil((wallArea / 32) * 1.1);

    // Flooring: Area + 10% waste
    const flooringSqFt = Math.ceil(floorArea * 1.1);

    // Paint: 350 sq ft per gallon (1 coat). Usually need 2 coats + primer.
    // Let's assume 2 coats of paint.
    const paintGallons = Math.ceil((wallArea / 350) * 2);

    // Insulation: 15" wide rolls for 16" OC bays.
    // Each stud bay is ~14.5" wide.
    // Total bays approx = perimeter / 1.33.
    // Easier calc: Wall Area - (Stud Area). Roughly just Wall Area sq ft.
    // Rolls usually cover ~40-50 sq ft (R13 Kraft Faced 15" x 32').
    const insulationRolls = Math.ceil(wallArea / 40);
    // Batts usually sold in bags covering ~40-50 sq ft as well
    const insulationBatts = Math.ceil(wallArea / 40);

    setResults({
      perimeter,
      wallArea,
      floorArea,
      studs: studCount,
      plates: plateCount,
      drywallSheets,
      flooringSqFt,
      paintGallons,
      insulationRolls,
      insulationBatts
    });
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground relative overflow-hidden">
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

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
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

                      <Button type="submit" size="lg" className="w-full font-bold uppercase tracking-wide text-md h-12">
                        Calculate Materials <ArrowRight className="ml-2 h-4 w-4" />
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
              <ul className="list-disc pl-4 space-y-1 text-xs">
                <li>Studs calculated at 16" on-center + corners.</li>
                <li>Drywall includes 10% waste factor.</li>
                <li>Flooring includes 10% cutting allowance.</li>
                <li>Paint assumes 2 coats on fresh drywall.</li>
              </ul>
            </motion.div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8">
            {results ? (
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

                <Separator className="my-6" />
                
                <h2 className="text-2xl font-bold tracking-tight mb-6">Material Requirements</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Framing */}
                  <MaterialCard 
                    icon={Hammer}
                    title="Framing Lumber"
                    color="text-orange-500"
                    items={[
                      { label: "2x4 Studs (8ft)", value: results.studs, unit: "pcs" },
                      { label: "2x4 Plates (10ft)", value: results.plates, unit: "pcs" },
                    ]}
                  />

                  {/* Drywall */}
                  <MaterialCard 
                    icon={Layers}
                    title="Drywall & Insulation"
                    color="text-blue-500"
                    items={[
                      { label: "4x8 Drywall Sheets", value: results.drywallSheets, unit: "sheets" },
                      { label: "R13 Insulation Rolls", value: results.insulationRolls, unit: "rolls" },
                      { label: "R13 Insulation Batts", value: results.insulationBatts, unit: "bags" },
                    ]}
                  />

                  {/* Flooring */}
                  <MaterialCard 
                    icon={Grid3X3}
                    title="Flooring"
                    color="text-emerald-500"
                    items={[
                      { label: "Total Coverage", value: results.flooringSqFt, unit: "sq ft" },
                      { label: "Base Floor Area", value: results.floorArea, unit: "sq ft" },
                    ]}
                  />

                  {/* Paint */}
                  <MaterialCard 
                    icon={PaintBucket}
                    title="Finishing"
                    color="text-purple-500"
                    items={[
                      { label: "Wall Paint (2 coats)", value: results.paintGallons, unit: "gallons" },
                      { label: "Primer (1 coat)", value: Math.ceil(results.paintGallons / 2), unit: "gallons" },
                    ]}
                  />
                </div>
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
    </div>
  );
}

function MaterialCard({ icon: Icon, title, color, items }: { 
  icon: any, 
  title: string, 
  color: string, 
  items: { label: string, value: number, unit: string }[] 
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
            <div key={i} className="flex justify-between items-center border-b border-dashed last:border-0 pb-2 last:pb-0">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="font-mono font-bold text-lg">
                {item.value} <span className="text-xs font-normal text-muted-foreground">{item.unit}</span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
