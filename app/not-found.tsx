import React from "react";
import { getNotFoundData } from "@/lib/queries/notFound";
import { getTheme } from "@/lib/queries/colorPalettQuery";
import NotFoundClient from "@/components/common/NotFoundClient";

export default async function NotFound() {
  const [data, theme] = await Promise.all([
    getNotFoundData().catch(() => null),
    getTheme().catch(() => null),
  ]);

  return <NotFoundClient data={data} theme={theme} />;
}
