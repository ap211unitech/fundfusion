"use client";

import { useAppKitAccount } from "@reown/appkit/react";
import { useMemo } from "react";

import { checkIfOwnerCanWithdraw, checkIfUserCanGetRefund } from "@/lib/utils";
import { Campaign } from "@/types";

import { DonateToCampaign } from "./donate";
import { DeleteCampaign } from "./delete";
import { ProcessRefund } from "./refund";
import { EditCampaign } from "./edit";
import { Withdraw } from "./withdraw";

type Props = {
  campaign: Campaign;
  categories: string[];
  isCampaignActive: boolean;
};

export const Actions = ({ categories, campaign, isCampaignActive }: Props) => {
  const { address } = useAppKitAccount();

  const isDonatable = useMemo(
    () =>
      isCampaignActive &&
      !!address &&
      campaign.owner.toLowerCase() !== address?.toLowerCase(),
    [address, campaign.owner, isCampaignActive],
  );

  const isEditable = useMemo(
    () =>
      !!address &&
      campaign.owner.toLowerCase() === address?.toLowerCase() &&
      isCampaignActive,
    [address, campaign.owner, isCampaignActive],
  );

  const isDeletable = useMemo(
    () =>
      !!address &&
      campaign.owner.toLowerCase() === address?.toLowerCase() &&
      isCampaignActive,
    [address, campaign.owner, isCampaignActive],
  );

  const isWithdrawable = useMemo(
    () => !!address && checkIfOwnerCanWithdraw(campaign, address),
    [address, campaign],
  );

  const isRefundable = useMemo(
    () => !!address && checkIfUserCanGetRefund(campaign, address),
    [address, campaign],
  );

  return (
    <div className="flex items-center gap-3">
      {isDonatable && <DonateToCampaign campaign={campaign} />}
      {isEditable && (
        <EditCampaign campaign={campaign} categories={categories} />
      )}
      {isDeletable && <DeleteCampaign campaign={campaign} />}
      {isWithdrawable && <Withdraw campaign={campaign} />}
      {isRefundable && (
        <ProcessRefund campaign={campaign} userAddress={address as string} />
      )}
    </div>
  );
};
