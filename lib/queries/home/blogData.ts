import { client } from "@/lib/sanity";

export const blogQuery = `
*[_type == "homepage"][0]{
  blog {
    isEnabled,
    heading,
    subheading,
    backgroundColor,
    textColor,
    accentColor,
    cardBackgroundColor,
    cardTextColor,
    readMoreLabel,
    viewAllLabel,
    "selectedPosts": coalesce(
      selectedPosts[]->{
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        excerpt,
        author,
        categories
      },
      *[_type == "blogPost"] | order(publishedAt desc)[0...3]{
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        excerpt,
        author,
        categories
      }
    )
  }
}
`;

export type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  publishedAt?: string;
  excerpt?: string;
  author?: string;
  categories?: string[];
};

export type BlogSectionData = {
  isEnabled?: boolean;
  heading?: string;
  subheading?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  cardBackgroundColor?: string;
  cardTextColor?: string;
  readMoreLabel?: string;
  viewAllLabel?: string;
  selectedPosts?: BlogPost[];
};

export type BlogQueryResult = {
  blog?: BlogSectionData;
};

export async function getBlogData(): Promise<BlogQueryResult> {
  return await client.fetch(blogQuery, {}, { cache: "no-store" });
}
