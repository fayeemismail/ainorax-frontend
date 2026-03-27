import { client } from "@/lib/sanity";

export type WhyChooseUsPoint = {
  _key: string;
  title: string;
  description: string;
  iconName: string;
};

export type WhyChooseUsData = {
  isEnabled: boolean;
  mainHeading: string;
  subheading: string;
  points: WhyChooseUsPoint[];
  bgColor?: string;
  textColor?: string;
  sectionBgColor?: string;
  headingColor?: string;
  accentColor?: string;
};

const query = `
  *[_type == "homepage"][0]{
    whyChooseUs {
      isEnabled,
      mainHeading,
      subheading,
      points[]{
        _key,
        title,
        description,
        iconName
      },
      bgColor,
      textColor,
      sectionBgColor,
      headingColor,
      accentColor
    }
  }.whyChooseUs
`;

export async function getWhyChooseUsData(): Promise<WhyChooseUsData | null> {
  return await client.fetch(query, {}, { cache: "no-store", next: { revalidate: 0 } });
}
