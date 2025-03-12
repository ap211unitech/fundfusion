"use server";

import { revalidatePath } from "next/cache";

export const refreshPage = (path: string) => {
  revalidatePath(path);
};
