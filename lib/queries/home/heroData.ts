import { client } from "@/lib/sanity";

export const heroQuery = `
*[_type == "homepage"][0]{
  hero {
    headline,
    subheadline,
    bgColor,
    glowLeft,
    glowRight,
    eyebrowColor,
    headlineColor,
    headlineAccent,
    subheadlineColor,
    buttonBg,
    buttonGlow,
    logo { asset->{ _id, url } },
    logoLink,
    images[]{ asset->{ _id, url } },
    cta { label, href }
  }
}
`;

export type HeroImage = {
  asset: { _id: string; url: string };
};

export type Hero = {
  headline?: string;
  subheadline?: string;
  bgColor?: string;
  glowLeft?: string;
  glowRight?: string;
  eyebrowColor?: string;
  headlineColor?: string;
  headlineAccent?: string;
  subheadlineColor?: string;
  buttonBg?: string;
  buttonGlow?: string;
  logo?: { asset: { _id: string; url: string } };
  logoLink?: string;
  images?: HeroImage[];
  cta?: { label?: string; href?: string };
};

export type HeroQueryResult = { hero?: Hero };

export async function getHero(): Promise<HeroQueryResult> {
  return await client.fetch(heroQuery, {}, { cache: "no-store" });
}