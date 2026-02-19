import { useRoute, Link } from "wouter";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog-posts";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:id");
  const id = params?.id as string;
  const post = BLOG_POSTS[id as keyof typeof BLOG_POSTS] || BLOG_POSTS["1"]; // Fallback to first post if ID not found

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow max-w-4xl">
        <Link href="/blog">
          <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Articles
          </Button>
        </Link>

        <article className="prose prose-slate lg:prose-lg max-w-none">
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-md">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-background/90 text-foreground hover:bg-background/100 backdrop-blur-sm">
                {post.category}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime}</span>
            <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-8">{post.title}</h1>

          <div 
            className="text-foreground leading-relaxed space-y-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-primary [&>h3]:mt-8 [&>h3]:mb-2"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>

        <div className="border-t mt-12 pt-8 flex justify-between items-center">
          <p className="font-bold text-lg">Share this article</p>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
          }}>
            <Share2 className="h-4 w-4" /> Copy Link
          </Button>
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground bg-muted/30 mt-12">
        <p>&copy; 2026 RenoCalc Pro. Built by D&D True Craftsmen.</p>
      </footer>
    </div>
  );
}
