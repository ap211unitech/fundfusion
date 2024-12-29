import { MoveUpRight } from "lucide-react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import { trimString } from "@/lib/utils";
import { ContributionEvent } from "@/types";
import { Identicon, ScrollArea } from "@/components/ui";

export const RecentContributions = ({
  contributions = [],
}: {
  contributions: ContributionEvent[];
}) => {
  if (contributions.length === 0) return <></>;

  return (
    <div className="space-y-3 rounded-xl border border-primary px-5 py-4">
      <h2 className="text-lg text-primary">Recent Contributions</h2>
      <ScrollArea
        scrollHideDelay={0}
        className={classNames(contributions.length < 5 ? "h-full" : "h-40")}
      >
        <div className="space-y-3 pr-5">
          {contributions.map(
            ({ donatorAddress, donatedAmount, timestamp }, index) => {
              return (
                <div
                  key={donatorAddress + index}
                  className="flex items-center justify-between text-muted-foreground"
                >
                  <div className="flex items-center gap-10">
                    <div className="flex items-center gap-2">
                      <Identicon address={donatorAddress} />
                      <Link
                        target="_blank"
                        href={`https://sepolia.etherscan.io/address/${donatorAddress}`}
                        className="group flex items-center"
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 group-hover:text-primary">
                            {trimString(donatorAddress, 12)}
                            <MoveUpRight className="h-4 w-4" />
                          </div>
                          <p className="text-xs opacity-60 2xl:hidden">
                            {moment(timestamp).format("MMM Do YYYY")}
                          </p>
                        </div>
                      </Link>
                    </div>
                    <p className="hidden 2xl:block">
                      {moment(timestamp).format("MMM Do YYYY, hh:mm:ss a")}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 text-lg text-foreground dark:text-secondary">
                      {donatedAmount} ETH
                      <Image
                        src="/ethereum.webp"
                        alt="ethereum"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
