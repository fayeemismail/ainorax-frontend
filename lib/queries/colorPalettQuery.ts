import { groq } from "next-sanity"
import { client } from "@/lib/sanity"

/* =========================
   TYPES
========================= */

type ColorItem = {
  label: string
  value: string
}

type ButtonItem = {
  label: string
  bgColor: string
  textColor: string
}

type ColorPaletteQueryResult = {
  backgrounds: ColorItem[]
  texts: ColorItem[]
  buttons: ButtonItem[]
}

export type Theme = {
  background: Record<string, string>
  text: Record<string, string>
  button: Record<
    string,
    {
      bgColor: string
      textColor: string
    }
  >
}

/* =========================
   QUERY
========================= */

const query = `
*[_type == "colorPalette"][0]{
  backgrounds[]{ label, value },
  texts[]{ label, value },
  buttons[]{ label, bgColor, textColor }
}
`

/* =========================
   TRANSFORM
========================= */

function transformPalette(data: ColorPaletteQueryResult): Theme {
  return {
    background: Object.fromEntries(
      (data?.backgrounds || []).map((c) => [c.label, c.value])
    ),

    text: Object.fromEntries(
      (data?.texts || []).map((c) => [c.label, c.value])
    ),

    button: Object.fromEntries(
      (data?.buttons || []).map((b) => [
        b.label,
        {
          bgColor: b.bgColor,
          textColor: b.textColor
        }
      ])
    )
  }
}

/* =========================
   FETCH
========================= */

let cachedTheme: Theme | null = null

export async function getTheme(name: string = "default"): Promise<Theme> {
  if (!cachedTheme) {
    const data: ColorPaletteQueryResult = await client.fetch(query, { name })
    cachedTheme = transformPalette(data)
  }

  return cachedTheme
}