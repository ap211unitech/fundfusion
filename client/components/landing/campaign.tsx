import { Clock3, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui";
import { daysLeft } from "@/lib/utils";
import { Campaign as CampaignType } from "@/types";

export const Campaign = ({ campaign }: { campaign: CampaignType }) => {
  return (
    <Link
      href={`/campaign?id=${campaign.address}`}
      className="flex flex-col border rounded-md cursor-pointer group overflow-hidden shadow-md"
    >
      <div className="relative h-[280px]">
        <Image alt={campaign.title} src={campaign.image} layout="fill" />
      </div>
      <div className="p-4 space-y-3">
        <Badge className="rounded-full font-medium mb-1">
          {campaign.category}
        </Badge>
        <h2 className="text-lg group-hover:text-primary line-clamp-2">
          {campaign.title}
        </h2>
        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <p className="flex items-center gap-2">
            <Clock3 className="w-4 h-4" />
            {daysLeft(campaign.targetTimestamp)} days left
          </p>
          <p className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {campaign.contributors || 0} contributors
          </p>
        </div>
      </div>
    </Link>
  );
};
