import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Link } from "wouter";

// Mock Data
const BLOG_POSTS = [
  {
    id: 1,
    title: "5 Common Basement Renovation Mistakes",
    excerpt: "Avoid these costly errors when planning your basement finish. From moisture control to lighting layout, here's what the pros know.",
    date: "Feb 15, 2026",
    readTime: "5 min read",
    author: "Dave (Master Carpenter)",
    category: "Planning",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Drywall vs. Plaster: What's Best for Basements?",
    excerpt: "Understanding the differences between standard drywall, moisture-resistant green board, and traditional plaster for below-grade applications.",
    date: "Feb 10, 2026",
    readTime: "4 min read",
    author: "Sarah (Interior Design)",
    category: "Materials",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Understanding R-Value: Insulation 101",
    excerpt: "Why R13 might not be enough for your climate zone. A comprehensive guide to fiberglass batts, rigid foam, and spray foam options.",
    date: "Jan 28, 2026",
    readTime: "7 min read",
    author: "Mike (Energy Specialist)",
    category: "Insulation",
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Flooring Options for Concrete Subfloors",
    excerpt: "LVP, Laminate, or Carpet? We rank the top flooring choices for durability, moisture resistance, and warmth underfoot.",
    date: "Jan 15, 2026",
    readTime: "6 min read",
    author: "Dave (Master Carpenter)",
    category: "Flooring",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4" variant="outline">Expert Advice</Badge>
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">Renovation Knowledge Base</h1>
          <p className="text-muted-foreground text-lg">
            Tips, tricks, and material guides from the D&D True Craftsmen team to help you plan your next project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-muted">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
                <Badge className="absolute top-4 right-4 bg-background/90 text-foreground hover:bg-background/100">
                  {post.category}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                </div>
                <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.id}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="line-clamp-3 text-sm">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-0 border-t bg-muted/20 mt-auto p-4 flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <User className="h-3 w-3" /> {post.author}
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary-dark p-0 hover:bg-transparent" asChild>
                  <Link href={`/blog/${post.id}`}>
                    Read Article <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
          <BookOpen className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-4">Need personalized advice?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Our material calculator is a great start, but every basement is unique. Contact our team for a professional consultation.
          </p>
          <Button asChild>
            <a href="https://www.ddtruecraftsmen.com" target="_blank" rel="noopener noreferrer">
              Contact D&D True Craftsmen
            </a>
          </Button>
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground bg-muted/30">
        <p>&copy; 2026 RenoCalc Pro. Built by D&D True Craftsmen.</p>
      </footer>
    </div>
  );
}
