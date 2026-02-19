import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

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

export function Header() {
  const [location] = useLocation();

  return (
    <header className="relative z-10 border-b bg-card shadow-sm sticky top-0 no-print">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex flex-col items-center mx-auto sm:mx-0 sm:items-start sm:flex-row sm:gap-4 cursor-pointer">
            <div className="bg-primary p-2 rounded-md mb-2 sm:mb-0">
              <HomeCalculatorIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl font-bold tracking-tight text-primary">RenoCalc Pro</h1>
              <p className="text-[10px] text-muted-foreground tracking-wider uppercase">Basement Renovation Material Estimator</p>
            </div>
          </div>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/">
            <a className={cn("text-sm font-medium transition-colors hover:text-primary", location === "/" ? "text-primary font-bold" : "text-muted-foreground")}>
              Calculator
            </a>
          </Link>
          <Link href="/blog">
            <a className={cn("text-sm font-medium transition-colors hover:text-primary", location.startsWith("/blog") ? "text-primary font-bold" : "text-muted-foreground")}>
              Renovation Tips
            </a>
          </Link>
          <div className="hidden sm:block text-xs text-muted-foreground font-mono ml-4 border-l pl-4">
            V1.0.0
          </div>
        </nav>
      </div>
    </header>
  );
}
