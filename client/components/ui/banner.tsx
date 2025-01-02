import Link from "next/link";
import classNames from "classnames";
import { Search } from "lucide-react";
import { Unbounded } from "next/font/google";

import { Button } from "./button";

const font = Unbounded({
  subsets: ["cyrillic-ext"],
  weight: ["200", "300", "400"],
});

export const Banner = () => {
  return (
    <div className="flex flex-col gap-8 rounded-lg border bg-primary/20 p-6 dark:bg-primary/5 lg:flex-row lg:items-center lg:px-16 lg:py-10">
      <div className="flex flex-col gap-2 lg:basis-1/2">
        <h2
          className={classNames(
            "text-3xl font-light tracking-wide text-secondary-foreground dark:text-secondary",
            font.className,
          )}
        >
          FundFusion
        </h2>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>
            A decentralized crowdfunding platform enabling users to create,
            manage, and contribute to campaigns transparently.
          </p>
          <p>
            Campaign owners can withdraw funds, contributors can claim refunds
            under certain conditions, and admins can manage campaign categories
            for better organization.
          </p>
        </div>
      </div>
      <div className="flex lg:basis-1/2 lg:justify-center">
        <Button asChild>
          <Link href="#discoverCampaigns" className="text-primary-foreground">
            <Search className="mr-2 h-4 w-4" />
            Explore Campaigns
          </Link>
        </Button>
      </div>
    </div>
  );
};
