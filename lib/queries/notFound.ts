import { client } from "@/lib/sanity";

export const notFoundQuery = `
*[_type == "notFoundPage"][0]{
  headline,
  subheadline,
  bgColor,
  textColor,
  cta {
    label,
    link,
    bgColor,
    textColor
  }
}
`;

export type NotFoundData = {
  headline?: string;
  subheadline?: string;
  bgColor?: string;
  textColor?: string;
  cta?: {
    label?: string;
    link?: string;
    bgColor?: string;
    textColor?: string;
  };
};

export async function getNotFoundData(): Promise<NotFoundData> {
  return await client.fetch(notFoundQuery, {}, { cache: "no-store" });
}
