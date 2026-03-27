import { client } from "@/lib/sanity";

// --- Types ---
export type BlogPostSnippet = {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  publishedAt?: string;
  excerpt?: string;
  author?: string;
  categories?: string[];
};

export type FullBlogPost = BlogPostSnippet & {
  body?: any[]; // PortableText array
};

// --- Queries ---

const getAllPostsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    author,
    categories
  }
`;

const getPostBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    author,
    categories,
    body
  }
`;

// --- Fetch Functions ---

export async function getAllBlogPosts(): Promise<BlogPostSnippet[]> {
  return await client.fetch(getAllPostsQuery, {}, { cache: "no-store" });
}

export async function getBlogPostBySlug(slug: string): Promise<FullBlogPost | null> {
  return await client.fetch(getPostBySlugQuery, { slug }, { cache: "no-store" });
}
