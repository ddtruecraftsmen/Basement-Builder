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
    title: "Train Creativity",
    excerpt: "How to create the spark of creativity in any home project.",
    // PASTE YOUR HTML CONTENT INSIDE THE BACKTICKS BELOW (`...`)
    content: `
      <p>Train Creativity


The term, “Dream Job” and phrase, “It’s not work if you’re passionate about it” get tossed around so much that I fear it’s crippling some people's sense of personal value when it comes to a career choice.  I have had many different jobs over the years.

Ice Cream Shop, Coffee shop, Shipper/Receiver, Stock Room clerk, Customer Service Rep, Landscaper, Fine artist at a Studio, Bonsai Tree Designer, Freelance Illustrator, Apprentice Carpenter, Licensed Carpenter, Contractor/Owner.


I didn’t apply for any of these jobs based on Passion.  I also didn’t leave any of them because of Passion either. I excelled at each and every job I was given.  Not at first.  At first I was usually indifferent to every job. I would always reach a point in each new job where I would come to the realization that either I quit, or double down and learn. Learn how to do the best job I could.  Learn how to keep getting better.  I would always have to remind myself that learning while working not only helps the time go by, but tricks your mind to change from “I could care less “ to “get the job done.”


There is a lot of merit to “tricking your mind”.  I think you can trick your mind into being passionate about your job.  I also feel that you can train your employees to trick their own minds  into being passionate about their job too.  You trick them by setting goals, and allowing them to learn to solve the problem through your teaching or their own research.  Once they can mentally see the finish line and the end product they can see how what they are doing isn’t just a small task. It’s part of a larger picture.  


Once you start building the passion for the task at hand and knowing the end goal they will start to crave the learning experience.  Knowing they are building an arsenal of knowledge they can leverage in future projects.  


You can’t expect your employees to just have passion. You have to lead by example. Don’t hold them back from learning as much as they can at work and on their own time.  Don’t treat them as just another pair of hands.  Focus on their learning ability.  Both physical and mental.  Give them a task that they have to learn on their own and you will see the passion start to grow.  


The mind trick that leads to passion is learning.  So set the goals and let your employees be part of something bigger than the individual tasks. Make your job site have a learning environment and you won't regret it.  They won't either.  


Devon Bowman

Owner,

D&D True Craftsmen</p>
      
      <h3>Section Heading</h3>
      <p>More content...</p>
      
      <img src="/your-image-filename.jpg" alt="Description" />
    `,
    date: "Feb 19, 2026",
    readTime: "5 min read",
    author: "Devon Bowman",
    category: "Category Name",
    image: "/Train Creativity.jpg" // Replace with your image path (e.g. "/my-image.jpg")
  },
  "2": {
    id: "2",
    title: "Article 2 Title Here",
    excerpt: "Short summary of article 2.",
    // PASTE YOUR HTML CONTENT INSIDE THE BACKTICKS BELOW (`...`)
    content: `
      <p>Paste your second article HTML here.</p>
    `,
    date: "Feb 20, 2026",
    readTime: "5 min read",
    author: "Devon Bowman",
    category: "Category Name",
    image: "/your-second-image.jpg" 
  }
};
