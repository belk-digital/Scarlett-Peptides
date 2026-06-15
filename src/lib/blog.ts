import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  category: string;
  readingTime: string;
  content: string;
};

export function getPostSlugs() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs.readdirSync(contentDirectory).filter(file => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      title: data.title || "Untitled",
      date: data.date || "",
      excerpt: data.excerpt || "",
      coverImage: data.coverImage || "/images/placeholder.jpg",
      category: data.category || "Uncategorized",
      readingTime: data.readingTime || "5 min read",
      content,
    };
  } catch (error) {
    console.error(`Error reading blog post: ${slug}`, error);
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  
  return posts;
}
