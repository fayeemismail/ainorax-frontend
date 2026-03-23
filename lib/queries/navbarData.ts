// lib/queries/navbarData.ts

import { client } from "@/lib/sanity";

/* =========================
   TYPES
========================= */

export type NavLink = {
  label?: string;
  href?: string;
  children?: NavLink[];
};

export type Navbar = {
  logoText?: string;
  logoLink?: string;

  logoImage?: string

  background?: string;
  textColor?: string;

  links?: NavLink[];

  ctaButton?: {
    label?: string;
    href?: string;
  };
};

export type NavbarQueryResult = {
  navbar?: Navbar;
};

/* =========================
   QUERY
========================= */

const navbarQuery = `
*[_type == "homepage"][0]{
  navbar {
    logoText,
    logoLink,

    "logoImage": logoImage.asset->url,

    background,
    textColor,

    links[]{
      label,
      href,
      children[]{
        label,
        href
      }
    },

    ctaButton{
      label,
      href
    }
  }
}
`;

/* =========================
   FETCH (with cache)
========================= */

let cachedNavbar: Navbar | null = null;

export async function getNavbar(): Promise<Navbar> {
  if (!cachedNavbar) {
    const data: NavbarQueryResult = await client.fetch(navbarQuery);
    cachedNavbar = data?.navbar ?? {};
  }

  return cachedNavbar;
}