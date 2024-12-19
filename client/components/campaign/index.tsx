import { redirect } from "next/navigation";
import Image from "next/image";

import { SearchParams } from "@/types";
import { getCampaignData } from "@/fetchers";
import { Badge } from "@/components/ui";

import { Actions } from "./actions";

export const Campaign = async ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) => {
  if (!searchParams) return redirect("/");

  const campaignContractAddress = searchParams.id as string;
  if (!campaignContractAddress) return redirect("/");

  const campaign = await getCampaignData(campaignContractAddress);
  if (!campaign?.address) return redirect("/");

  return (
    <div className="mx-auto grid max-w-[80%] grid-cols-2 gap-10 py-12">
      <div className="relative h-[400px] overflow-hidden rounded-md">
        <Image
          fill
          src={campaign.image}
          alt={campaign.title}
          style={{ objectFit: "cover" }}
          className="transition-all duration-300 hover:scale-95"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl text-primary">{campaign.title}</h1>
        <Badge className="w-fit rounded-full">{campaign.category}</Badge>
        <p className="text-justify text-sm opacity-40">
          {campaign.description}
        </p>
        <Actions campaign={campaign} />
      </div>
    </div>
  );
};
