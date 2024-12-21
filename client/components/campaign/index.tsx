import { MoveUpRight } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import moment from "moment";

import { Badge, ImageComponent } from "@/components/ui";
import { getCampaignData } from "@/fetchers";
import { trimString } from "@/lib/utils";
import { SearchParams } from "@/types";

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

  console.log(campaign);

  return (
    <div className="mx-auto grid max-w-[80%] grid-cols-2 gap-10 py-12">
      <div className="flex flex-col gap-6">
        <div className="relative h-[400px] overflow-hidden">
          <ImageComponent
            fill
            src={campaign.image}
            alt={campaign.title}
            className="rounded-xl transition-all duration-300 hover:scale-95"
          />
        </div>
        <div className="flex flex-col text-secondary [&>div]:border-b [&>div]:py-2">
          <div className="grid grid-cols-2">
            <span className="text-lg text-primary">Target amount</span>
            {campaign.targetAmount} ETH
          </div>
          <div className="grid grid-cols-2">
            <span className="text-lg text-primary">Campaign ending on</span>
            {moment(campaign.targetTimestamp).format(
              "dddd, MMMM Do YYYY, h:mm:ss a",
            )}
          </div>
          <div className="grid grid-cols-2">
            <span className="text-lg text-primary">Created by</span>
            <Link
              target="_blank"
              href={`https://sepolia.etherscan.io/address/${campaign.owner}`}
              className="flex items-center gap-1 hover:text-primary"
            >
              <MoveUpRight className="h-4 w-4" />
              {trimString(campaign.owner)}
            </Link>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-lg text-primary">IPFS</span>
            <Link
              target="_blank"
              href={campaign.image}
              className="flex items-center gap-1 hover:text-primary"
            >
              <MoveUpRight className="h-4 w-4" />
              {trimString(campaign.image, 20)}
            </Link>
          </div>
        </div>
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
