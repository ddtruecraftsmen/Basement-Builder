import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Link } from "wouter";
import { BLOG_POSTS } from "@/data/blog-posts";

export default function Blog() {
  const posts = Object.values(BLOG_POSTS);

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
          {posts.map((post) => (
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
