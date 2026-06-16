import { getAllPosts } from "@/lib/blog";
import BlogClient from "./BlogClient";

export const metadata = {
  title: "Research Journal | Scarlett Hawkins Peptides",
  description: "Deep dives into peptide purity, compounding science, and laboratory best practices.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return <BlogClient posts={posts} />;
}
