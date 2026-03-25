import { client } from "@/lib/sanity";

export const aboutQuery = `
*[_type == "aboutPage"][0]{
  hero {
    headline,
    subheadline,
    images[]{
      asset->{
        _id,
        url
      }
    },
    cta {
      label,
      link,
      bgColor,
      textColor
    },
    leftIcon,
    rightIcon
  },
  mission {
    title,
    content,
    image {
      asset->{
        _id,
        url
      }
    }
  },
  vision {
    title,
    content,
    image {
      asset->{
        _id,
        url
      }
    }
  },
  values[]{
    title,
    description,
    iconName,
    iconImage {
      asset->{
        _id,
        url
      }
    }
  },
  projects[]{
    title,
    category,
    description,
    image {
      asset->{
        _id,
        url
      }
    },
    link
  },
  finalCTA {
    headline,
    body,
    bgColor,
    textColor,
    button {
      label,
      link,
      bgColor,
      textColor
    }
  },
  stats[]{
    label,
    value
  }
}
`;

export type AboutData = {
  hero?: {
    headline?: string;
    subheadline?: string;
    images?: Array<{ asset: { _id: string; url: string } }>;
    cta?: { label?: string; link?: string; bgColor?: string; textColor?: string };
    leftIcon?: string;
    rightIcon?: string;
  };
  mission?: {
    title?: string;
    content?: string;
    image?: { asset: { url: string } };
  };
  vision?: {
    title?: string;
    content?: string;
    image?: { asset: { url: string } };
  };
  values?: Array<{
    title?: string;
    description?: string;
    iconName?: string;
    iconImage?: { asset: { url: string } };
  }>;
  projects?: Array<{
    title?: string;
    category?: string;
    description?: string;
    image?: { asset: { url: string } };
    link?: string;
  }>;
  finalCTA?: {
    headline?: string;
    body?: string;
    bgColor?: string;
    textColor?: string;
    button?: { label?: string; link?: string; bgColor?: string; textColor?: string };
  };
  stats?: Array<{
    label?: string;
    value?: string;
  }>;
};

export async function getAboutData(): Promise<AboutData> {
  return await client.fetch(aboutQuery, {}, { cache: "no-store" });
}
