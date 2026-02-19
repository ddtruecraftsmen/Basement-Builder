// Mock Data for Blog Posts
export interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  image: string;
}

export const BLOG_POSTS: Record<string, BlogPost> = {
  "1": {
    id: "1",
    title: "5 Common Basement Renovation Mistakes",
    excerpt: "Avoid these costly errors when planning your basement finish. From moisture control to lighting layout, here's what the pros know.",
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
    id: "2",
    title: "Drywall vs. Plaster: What's Best for Basements?",
    excerpt: "Understanding the differences between standard drywall, moisture-resistant green board, and traditional plaster for below-grade applications.",
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
  },
  "3": {
    id: "3",
    title: "Understanding R-Value: Insulation 101",
    excerpt: "Why R13 might not be enough for your climate zone. A comprehensive guide to fiberglass batts, rigid foam, and spray foam options.",
    content: `
      <p>Insulation is critical for keeping your basement comfortable and energy-efficient. R-value measures thermal resistance—the higher the number, the better the insulation.</p>
      
      <h3>Fiberglass Batts</h3>
      <p>The most common and affordable option. R13 is standard for 2x4 walls. However, it loses effectiveness if compressed or if moisture gets into the cavity.</p>

      <h3>Rigid Foam Board</h3>
      <p>Excellent for insulating against concrete walls. It provides a continuous thermal break and acts as a vapor barrier. Often used in combination with batt insulation.</p>

      <h3>Spray Foam</h3>
      <p>The gold standard. It seals gaps, provides high R-value per inch, and acts as a moisture barrier. It's more expensive but offers the best performance for rim joists and challenging areas.</p>
    `,
    date: "Jan 28, 2026",
    readTime: "7 min read",
    author: "Mike (Energy Specialist)",
    category: "Insulation",
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&q=80&w=1200"
  },
  "4": {
    id: "4",
    title: "Flooring Options for Concrete Subfloors",
    excerpt: "LVP, Laminate, or Carpet? We rank the top flooring choices for durability, moisture resistance, and warmth underfoot.",
    content: `
      <p>Concrete floors are cold and hard. Choosing the right flooring can transform your basement into a cozy living space.</p>
      
      <h3>Luxury Vinyl Plank (LVP)</h3>
      <p>Our top recommendation. It's waterproof, durable, and looks like real wood or stone. It often comes with an attached underlayment for warmth and sound absorption.</p>

      <h3>Laminate</h3>
      <p>A cost-effective alternative to wood. Ensure you choose a water-resistant product, as traditional laminate can swell if exposed to moisture.</p>

      <h3>Carpet</h3>
      <p>Warm and soft, but risky in basements. If you choose carpet, use a synthetic fiber that resists mold and install a high-quality moisture-barrier pad underneath.</p>
    `,
    date: "Jan 15, 2026",
    readTime: "6 min read",
    author: "Dave (Master Carpenter)",
    category: "Flooring",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
  }
};
