import { useRoute, Link } from "wouter";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User, ArrowLeft, Share2 } from "lucide-react";

// Mock Data (same as blog.tsx for simplicity in this mockup)
const BLOG_POSTS = {
  "1": {
    title: "5 Common Basement Renovation Mistakes",
    content: `
      <p>Finishing a basement is one of the most rewarding home improvement projects, adding valuable living space and increasing your home's value. However, below-grade environments present unique challenges that, if ignored, can lead to costly repairs later.</p>
      
      <h3>1. Ignoring Moisture Issues</h3>
      <p>The #1 enemy of any basement is water. Before you frame a single wall, you must address any moisture intrusion. Tape a 2x2 foot piece of plastic to the concrete floor and wall. If condensation forms underneath after 24 hours, you have hydrostatic pressure or moisture wicking through the concrete. Seal it before you cover it!</p>

      <h3>2. Using Organic Materials on Concrete</h3>
      <p>Never place untreated wood directly on a concrete slab. It will wick moisture and rot. Use a pressure-treated bottom plate or a foam sill gasket as a capillary break.</p>

      <h3>3. Poor Lighting Layout</h3>
      <p>Basements are naturally dark. Don't rely on a single center fixture. Plan for recessed lighting (pot lights) in a grid pattern. Dimmers are your best friend for creating ambiance in a multipurpose space.</p>

      <h3>4. Forgetting Access Panels</h3>
      <p>Your basement likely houses main shut-offs, cleanouts, and junction boxes. Don't drywall over them! Install clean, discrete access panels so you can reach them in an emergency.</p>

      <h3>5. Skimping on Soundproofing</h3>
      <p>If you're building a media room or home office, standard drywall won't block the sound of footsteps from upstairs. Consider using resilient channel (RC-1) or specialized sound-dampening drywall (like QuietRock) for the ceiling.</p>
    `,
    date: "Feb 15, 2026",
    readTime: "5 min read",
    author: "Dave (Master Carpenter)",
    category: "Planning",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200"
  },
  "2": {
    title: "Drywall vs. Plaster: What's Best for Basements?",
    content: `
      <p>When it comes to finishing basement walls, the material choice matters more than you might think. While standard drywall is the industry standard for above-grade rooms, basements require materials that can withstand potential humidity.</p>
      
      <h3>Standard Drywall</h3>
      <p>Paper-faced gypsum board. It's cheap and easy to finish, but the paper face is food for mold if it gets wet. Avoid using standard drywall in bathrooms or laundry areas.</p>

      <h3>Moisture-Resistant (Green/Purple Board)</h3>
      <p>These panels have a treated core and facer that resists moisture absorption. They are highly recommended for basement bathrooms and potentially the lower 4 feet of all basement walls if you live in a flood-prone area.</p>

      <h3>Cement Board</h3>
      <p>Indestructible by water. Use this as a tile backer in showers. It's heavy and hard to cut, so don't use it for general walls.</p>

      <h3>The Verdict</h3>
      <p>For most dry basements, standard drywall is acceptable for walls, but upgrading to mold-resistant board gives you cheap insurance against musty smells and mold growth behind the paint.</p>
    `,
    date: "Feb 10, 2026",
    readTime: "4 min read",
    author: "Sarah (Interior Design)",
    category: "Materials",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200"
  }
};

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
