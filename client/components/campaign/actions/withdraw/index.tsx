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
import { useWithdrawFromCampaign } from "@/hooks";

export const Withdraw = ({ campaign }: { campaign: Campaign }) => {
  const { mutateAsync: onWithdraw, isPending } = useWithdrawFromCampaign();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-medium text-primary">
          <div className="mr-3 h-6 scale-[1.3]">🎉</div>
          Congrats! Target Achieved, Funds Awaiting You!
        </CardTitle>
      </CardHeader>
      <CardContent className="-mt-2 text-sm">
        Your campaign has successfully reached its target, collecting{" "}
        {campaign.totalRaisedAmount} ETH. You can now receive funds in your
        account and start making an impact!
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          disabled={isPending}
          className="flex items-center gap-2"
          onClick={() => onWithdraw({ campaignAddress: campaign.address })}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Crediting funds...
            </>
          ) : (
            <>
              <HandCoins className="h-5 w-5" />
              Get funds in your account
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
