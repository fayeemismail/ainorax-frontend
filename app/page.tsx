import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import { getTheme } from "@/lib/queries/colorPalettQuery";
import { client } from "@/lib/sanity";
import Image from "next/image";


export default async function  Home() {
  const theme = await getTheme();
  const bg = theme.background.homebg || "fff"
  return (
    <>
      <main style={{ background: bg }} className="min-h-screen">

        <Hero />

        <Services />

      </main>
    </>
  );
}
