import { redirect } from "next/navigation";
import { Telescope } from "lucide-react";

import { SearchParams } from "@/types";
import { checkIfCampaignActive } from "@/lib/utils";
import { getCampaignsForCategory } from "@/fetchers";

import { Campaign } from "./campaign";

export const Campaigns = async ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) => {
  if (!searchParams) return redirect("/");

  const category = searchParams?.category as string;
  if (!category) return redirect("/");

  const campaignsForCategory = (await getCampaignsForCategory(category)).filter(
    (campaign) => checkIfCampaignActive(campaign),
  );

  return (
    <div className="space-y-10 py-12">
      <h1 className="flex items-center gap-2 text-2xl font-medium text-primary">
        <Telescope /> Discover Campaigns in {category}
      </h1>
      {campaignsForCategory.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {campaignsForCategory.map((campaign) => {
            return <Campaign campaign={campaign} key={campaign.address} />;
          })}
        </div>
      ) : (
        <h2>No active campaigns in this category</h2>
      )}
    </div>
  );
};
