import { Coins, Info, MoveUpRight, TriangleAlert, Users } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import moment from "moment";

import {
  Badge,
  Alert,
  ImageComponent,
  AlertDescription,
} from "@/components/ui";
import { getCampaignData } from "@/fetchers";
import { CampaignStatus, SearchParams } from "@/types";
import { getIpfsHashFromUrl, trimString } from "@/lib/utils";

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

  const isCampaignActive =
    !campaign.fundWithdrawanByOwner &&
    campaign.status === CampaignStatus.ACTIVE &&
    campaign.targetTimestamp > new Date().getTime();

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
              {trimString(getIpfsHashFromUrl(campaign.image), 14)}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl text-primary">{campaign.title}</h1>
        <Badge className="w-fit rounded-full">{campaign.category}</Badge>
        <p className="text-justify text-sm text-muted-foreground">
          {campaign.description}
        </p>

        <div className="grid grid-cols-2 rounded-xl border border-primary">
          <div className="border-r border-primary px-5 py-3">
            <div className="flex items-center gap-1.5 text-lg text-primary">
              <Users className="h-5 w-5" />
              Contributors
            </div>
            <div>{campaign.contributors}</div>
          </div>
          <div className="px-5 py-3">
            <div className="flex items-center gap-1.5 text-lg text-primary">
              <Coins className="h-5 w-5" />
              Total collected amount
            </div>
            <div>{campaign.totalRaisedAmount}</div>
          </div>
        </div>

        {campaign.fundWithdrawanByOwner && (
          <Alert variant="warning" className="flex items-center">
            <div>
              <TriangleAlert className="mr-2 h-4 w-4" />
            </div>
            <AlertDescription>
              The owner has already withdrawn the collected amount.
            </AlertDescription>
          </Alert>
        )}
        {isCampaignActive ? (
          <Actions isCampaignActive={isCampaignActive} campaign={campaign} />
        ) : (
          <Alert variant="destructive" className="flex items-center">
            <div>
              <Info className="mr-2 h-4 w-4" />
            </div>
            <AlertDescription>
              This campaign is no more active.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};
