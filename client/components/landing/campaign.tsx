import { Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui";
import { daysLeft } from "@/lib/utils";

const campaign = {
  address: "0xabcde",
  title: "Disk Plus: Ultra-slim Data Solution for Your Daily Tech",
  category: "Technology",
  description:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",
  image:
    "https://i.kickstarter.com/assets/046/155/467/569a3806003cd69d311dc2fb9b225a10_original.png?anim=false&fit=cover&gravity=auto&height=576&origin=ugc&q=92&width=1024&sig=r0BNKAM8fwQ5EJVdGTeZ5NWYcIts6rYMdtY3tnWWXkY%3D",
  targetAmount: 10,
  targetTimestamp: Math.floor(new Date().getTime() / 1000) + 4 * 90000,
};

export const Campaign = () => {
  return (
    <Link
      href={`/campaign?id=${campaign.address}`}
      className="flex flex-col border rounded-md cursor-pointer group overflow-hidden shadow-md"
    >
      <div className="relative h-[280px] bg-primary">
        <Image alt={campaign.title} src={campaign.image} layout="fill" />
      </div>
      <div className="p-4 space-y-2">
        <Badge className="rounded-full font-medium mb-1">
          {campaign.category}
        </Badge>
        <h2 className="text-lg group-hover:text-primary">{campaign.title}</h2>
        <p className="flex items-center gap-2 text-muted-foreground text-sm">
          <Clock3 className="w-4 h-4" />
          {daysLeft(campaign.targetTimestamp)} days left
        </p>
      </div>
    </Link>
  );
};
