"use client";

import { HandCoins, Loader2 } from "lucide-react";

import {
  Card,
  Button,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui";
import { Campaign } from "@/types";
import { useClaimRefund } from "@/hooks";

type Props = {
  campaign: Campaign;
  userAddress: string;
};

export const ProcessRefund = ({ campaign, userAddress }: Props) => {
  const { mutateAsync: onProcessRefund, isPending } = useClaimRefund();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-medium text-primary">
          <div className="mr-3 h-6 scale-[1.3]">💔</div>
          Campaign Inactive — Claim Your Refund!
        </CardTitle>
      </CardHeader>
      <CardContent className="-mt-2 text-sm">
        Unfortunately, this campaign is no longer active due to unforeseen
        circumstances. We sincerely appreciate your generous contribution of{" "}
        {campaign.contributors.get(userAddress)} ETH. Don&apos;t worry—you can
        easily recover your funds with just a few clicks!
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          disabled={isPending}
          className="flex items-center gap-2"
          onClick={() => onProcessRefund({ campaignAddress: campaign.address })}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Claiming funds...
            </>
          ) : (
            <>
              <HandCoins className="h-5 w-5" />
              Claim your funds
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
