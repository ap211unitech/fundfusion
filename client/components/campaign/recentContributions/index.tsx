import Image from "next/image";
import moment from "moment";

import { trimString } from "@/lib/utils";
import { ContributionEvent } from "@/types";
import { Identicon } from "@/components/ui";

export const RecentContributions = ({
  contributions = [],
}: {
  contributions: ContributionEvent[];
}) => {
  if (contributions.length === 0) return <></>;

  return (
    <div className="space-y-3 rounded-xl border border-primary px-5 py-4">
      <h2 className="text-lg text-primary">Recent Contributions</h2>
      <div className="max-h-40 space-y-4 overflow-auto">
        {contributions.map(
          ({ donatorAddress, donatedAmount, timestamp }, index) => {
            return (
              <div
                key={donatorAddress + index}
                className="flex items-center justify-between text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <Identicon address={donatorAddress} />
                  <p>{trimString(donatorAddress, 12)}</p>
                </div>
                <div className="flex items-center gap-10">
                  <p>{moment(timestamp).format("MMM Do YYYY, hh:mm:ss a")}</p>
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
    </div>
  );
};
