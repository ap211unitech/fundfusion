"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

export const refreshPage = (_path: string) => {
  // Revalidate all paths
  getRoutes().then((e) => {
    e.map((route) => revalidatePath(route));
  });
};

const APP_DIR = path.join(process.cwd(), "app");

export async function getRoutes(
  dir = APP_DIR,
  basePath = "",
): Promise<string[]> {
  let routes: string[] = [];

  const items = fs.readdirSync(dir);
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      const nestedRoutes = await getRoutes(itemPath, `${basePath}/${item}`);
      routes.push(...nestedRoutes);
    } else if (item === "page.tsx" || item === "page.js") {
      routes.push(basePath || "/");
    }
  }

  return routes;
}
