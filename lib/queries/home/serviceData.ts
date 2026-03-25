import { client } from "@/lib/sanity";

export const servicesQuery = `
*[_type == "homepage"][0]{
  services[] {
    mainHeading,
    sectionBg,
    headingColor,
    accentColor,
    viewMoreBg,
    viewMoreText,

    services[] {
      _key,
      title,
      description,
      bgColor,
      textColor,

      image {
        asset->{
          _id,
          url
        }
      },

      items[] {
        _key,
        title,
        description
      }
    }
  }
}
`;

export type ServiceItem = {
  _key: string;
  title?: string;
  description?: string;
};

export type ServiceGroup = {
  _key: string;
  title?: string;
  description?: string;
  bgColor?: string | null;
  textColor?: string | null;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  items?: ServiceItem[];
};

export type ServicesBlock = {
  mainHeading?: string;
  sectionBg?: string | null;
  headingColor?: string | null;
  accentColor?: string | null;
  viewMoreBg?: string | null;
  viewMoreText?: string | null;
  services?: ServiceGroup[];
};

export type ServicesQueryResult = {
  services?: ServicesBlock[];
};

export async function getServices(): Promise<ServicesQueryResult> {
  return await client.fetch(servicesQuery, {}, { cache: "no-store" });
}