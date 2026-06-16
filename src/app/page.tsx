import { getAllProducts } from "@/data/products";
import { getAllPosts } from "@/lib/blog";
import HomeClient from "@/components/HomeClient";

const FEATURED_SLUGS = ["klow", "glow", "retatrutide", "tesamorelin"];

export default function Home() {
  const allProducts = getAllProducts();
  const recentPosts = getAllPosts().slice(0, 3);
  const featuredProducts = FEATURED_SLUGS
    .map(slug => allProducts.find(p => p.slug === slug))
    .filter(Boolean) as typeof allProducts;

  return (
    <HomeClient 
      allProducts={allProducts} 
      featuredProducts={featuredProducts} 
      recentPosts={recentPosts} 
    />
  );
}
