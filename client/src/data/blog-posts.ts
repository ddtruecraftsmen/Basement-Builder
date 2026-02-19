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
  // COPY AND PASTE THIS BLOCK FOR EACH NEW ARTICLE
  "1": {
    id: "1",
    title: "Your Article Title Here",
    excerpt: "A short summary of your article that appears on the main blog page.",
    // PASTE YOUR HTML CONTENT INSIDE THE BACKTICKS BELOW (`...`)
    content: `
      <p>Paste your article HTML here.</p>
      
      <h3>Section Heading</h3>
      <p>More content...</p>
      
      <img src="/your-image-filename.jpg" alt="Description" />
    `,
    date: "Feb 19, 2026",
    readTime: "5 min read",
    author: "Your Name",
    category: "Category Name",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" // Replace with your image path (e.g. "/my-image.jpg")
  }
};
