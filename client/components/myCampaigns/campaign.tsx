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
      className="group flex cursor-pointer flex-col overflow-hidden rounded-md border shadow-lg transition-all hover:-translate-y-2 hover:border-primary"
    >
      <div className="relative h-[280px]">
        <Image
          fill
          alt={campaign.title}
          src={campaign.image}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="space-y-3 p-4">
        <Badge className="mb-1 rounded-full font-medium">
          {campaign.category}
        </Badge>
        <h2 className="line-clamp-2 text-lg group-hover:text-primary">
          {campaign.title}
        </h2>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            {daysLeft(campaign.targetTimestamp)} days left
          </p>
          <p className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {campaign.contributors || 0} contributors
          </p>
        </div>
      </div>
    </Link>
  );
};
