"use client";

import {
  Card,
  Button,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui";
import { Campaign } from "@/types";

export const Withdraw = ({ campaign }: { campaign: Campaign }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-medium text-primary">
          <div className="mr-3 h-6 scale-[1.3]">🎉</div>
          You&apos;ve got funds to withdraw!
        </CardTitle>
      </CardHeader>
      <CardContent className="-mt-2 text-sm">
        Your campaign has successfully reached its target, collecting{" "}
        {campaign.totalRaisedAmount} ETH. You can now receive funds in your
        account and start making an impact!
      </CardContent>
      <CardFooter>
        <Button>Get funds in your account</Button>
      </CardFooter>
    </Card>
  );
};
