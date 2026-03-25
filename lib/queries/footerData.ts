// lib/queries/footerData.ts

import { client } from "@/lib/sanity";

/* =========================
   TYPES
 ========================= */

export type FooterLink = {
  label?: string;
  href?: string;
};

export type FooterSection = {
  title?: string;
  links?: FooterLink[];
};

export type SocialLink = {
  platform?: string;
  href?: string;
  icon?: string;
};

export type Footer = {
  logoText?: string;
  logoLink?: string;
  logoImage?: string;
  description?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  copyrightText?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
};

export type FooterQueryResult = {
  footer?: Footer;
};

/* =========================
   QUERY
 ========================= */

const footerQuery = `
*[_type == "homepage"][0]{
  footer {
    logoText,
    logoLink,
    "logoImage": logoImage.asset->url,
    description,
    sections[]{
      title,
      links[]{
        label,
        href
      }
    },
    socialLinks[]{
      platform,
      href,
      icon
    },
    copyrightText,
    backgroundColor,
    textColor,
    accentColor
  }
}
`;

/* =========================
   FETCH
 ========================= */

export async function getFooter(): Promise<Footer> {
  const data: FooterQueryResult = await client.fetch(
    footerQuery,
    {},
    { next: { revalidate: 60 } } // Optional: revalidate every minute
  );
  return data?.footer ?? {};
}
