import { Circle, Coins, MoveUpRight, TriangleAlert, Users } from "lucide-react";
import { redirect } from "next/navigation";
import classNames from "classnames";
import Link from "next/link";
import moment from "moment";

import {
  Badge,
  Alert,
  AlertTitle,
  Description,
  ImageComponent,
  AlertDescription,
} from "@/components/ui";
import {
  trimString,
  getIpfsHashFromUrl,
  checkIfCampaignActive,
} from "@/lib/utils";
import { SearchParams } from "@/types";
import { getAllCategories, getCampaignData } from "@/fetchers";

import { Actions } from "./actions";
import { RecentContributions } from "./recentContributions";

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

  const categories = await getAllCategories();

  const isCampaignActive = checkIfCampaignActive(campaign);

  const isTargetAmountMet = campaign.totalRaisedAmount >= campaign.targetAmount;

  // It will be rendered when campaign is not active
  const recentUpdates = [
    !isCampaignActive && "This campaign is no more active.",

    isTargetAmountMet
      ? "This campaign has raised the desired amount of money."
      : "This campaign could not achieve the desired funding goal. All contributors are eligible to receive a full refund of their contributions.",

    campaign.fundWithdrawanByOwner &&
      "The owner has withdrawn the collected amount.",
  ].filter((e) => typeof e === "string");

  return (
    <div
      className={classNames(
        "mx-auto grid max-w-[90%] gap-10 py-12",
        "md:max-w-[80%]",
        "lg:max-w-[90%] lg:grid-cols-2",
      )}
    >
      <div className="flex flex-col gap-6">
        <div className="relative h-[300px] overflow-hidden sm:h-[400px]">
          <ImageComponent
            fill
            src={campaign.image}
            alt={campaign.title}
            className="rounded-xl transition-all duration-300 hover:scale-95"
          />
        </div>
        <div className="flex flex-col text-secondary [&>div]:gap-4 [&>div]:border-b [&>div]:py-2">
          <div className="grid grid-cols-2">
            <span className="text-lg text-primary">Target amount</span>
            {campaign.targetAmount} ETH
          </div>
          <div className="grid grid-cols-2">
            <span className="text-lg text-primary">Campaign ending on</span>
            {moment(campaign.targetTimestamp).format("MMM Do YYYY, hh:mm:ss a")}
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
        <Description
          value={campaign.description}
          className="text-justify text-sm text-muted-foreground"
        />
        <div className="grid rounded-xl border border-primary sm:grid-cols-2">
          <div className="space-y-1 border-primary px-5 py-3 sm:border-r">
            <div className="flex items-center gap-1.5 text-lg text-primary">
              <Users className="h-5 w-5" />
              Contributors
            </div>
            <div>{campaign.contributors.size}</div>
          </div>
          <div className="space-y-1 px-5 py-3">
            <div className="flex items-center gap-1.5 text-lg text-primary">
              <Coins className="h-5 w-5" />
              Amount raised
            </div>
            <div>{campaign.totalRaisedAmount} ETH</div>
          </div>
        </div>

        <RecentContributions contributions={campaign.allContributionEvents} />

        {!isCampaignActive && (
          <Alert variant="warning" className="space-y-3">
            <AlertTitle>
              <div className="flex items-center text-base">
                <TriangleAlert className="mr-2 h-4 w-4" />
                Recent updates
              </div>
            </AlertTitle>
            <AlertDescription className="flex flex-col gap-2 px-2">
              {recentUpdates.map((update) => (
                <div
                  key={update}
                  className="flex items-center text-foreground opacity-80 dark:opacity-100"
                >
                  <div>
                    <Circle className="mr-2.5 h-2 w-2 rounded-full fill-foreground" />
                  </div>
                  <div>{update}</div>
                </div>
              ))}
            </AlertDescription>
          </Alert>
        )}

        <Actions
          campaign={campaign}
          categories={categories}
          isCampaignActive={isCampaignActive}
        />
      </div>
    </div>
  );
};
