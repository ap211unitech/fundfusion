import { Users } from "lucide-react";
import Link from "next/link";

import { Campaign as CampaignType } from "@/types";
import { Badge, DurationLeft, ImageComponent } from "@/components/ui";

export const Campaign = ({ campaign }: { campaign: CampaignType }) => {
  return (
    <Link
      href={`/campaign?id=${campaign.address}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 shadow-lg transition-all hover:-translate-y-2 hover:border-primary"
    >
      <div className="relative h-[280px]">
        <ImageComponent fill alt={campaign.title} src={campaign.image} />
      </div>
      <div className="space-y-3 p-4">
        <Badge className="mb-1 rounded-full font-medium">
          {campaign.category}
        </Badge>
        <h2 className="line-clamp-2 text-lg group-hover:text-primary">
          {campaign.title}
        </h2>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <DurationLeft campaign={campaign} />
          <p className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {campaign.contributors.size || 0} contributors
          </p>
        </div>
      </div>
    </Link>
  );
};
