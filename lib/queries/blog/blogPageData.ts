import { client } from "@/lib/sanity";

const blogPageQuery = `
*[_type == "blogPage"][0]{
  seo { title, description },
  hero { heading, subheading, glowColorLeft, glowColorRight },
  colors { backgroundColor, textColor, accentColor, cardBackgroundColor, cardTextColor },
  ui { readMoreLabel, emptyStateMessage }
}
`;

export async function getBlogPageData() {
  return await client.fetch(blogPageQuery, {}, { cache: "no-store" });
}
