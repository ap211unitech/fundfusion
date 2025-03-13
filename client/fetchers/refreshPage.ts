"use server";

import { revalidatePath } from "next/cache";

export const refreshPage = (path: string) => {
  revalidatePath(path);
  revalidatePath("/campaign");
  revalidatePath("/campaigns");
  revalidatePath("/createCampaign");
  revalidatePath("/manageCategories");
  revalidatePath("/myCampaigns");
  revalidatePath("/myDonations");
  revalidatePath("/");
};
