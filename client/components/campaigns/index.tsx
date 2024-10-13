import { redirect } from "next/navigation";
import { Telescope } from "lucide-react";

import { SearchParams } from "@/types";
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

  const campaignsForCategory = await getCampaignsForCategory(category);

  return (
    <div className="space-y-10 py-12">
      <h1 className="text-2xl font-medium flex items-center gap-2 text-primary">
        <Telescope /> Discover Campaigns in {category}
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {campaignsForCategory.map((campaign) => {
          return <Campaign campaign={campaign} key={campaign.address} />;
        })}
      </div>
    </div>
  );
};
