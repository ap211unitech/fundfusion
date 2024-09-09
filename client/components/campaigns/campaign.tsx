import { Clock3, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui";
import { daysLeft } from "@/lib/utils";

const campaign = {
  address: "0xabcde",
  title: "HUMAN REFERENCES by Kibbitzer",
  category: "Art",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  image:
    "https://i.kickstarter.com/assets/046/196/139/0e1c606b50eb74128ec672d9af386ce5_original.png?anim=false&fit=cover&gravity=auto&height=576&origin=ugc&q=92&width=1024&sig=X%2BZ5ryGV%2F5TSUs8gSdQVMR8sPWCmN3NW1Q7XSRmsDj0%3D",
  targetAmount: 25,
  targetTimestamp: Math.floor(new Date().getTime() / 1000) + 4 * 90000,
  contributors: 16,
};

export const Campaign = () => {
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
        <h2 className="text-lg group-hover:text-primary">{campaign.title}</h2>
        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <p className="flex items-center gap-2">
            <Clock3 className="w-4 h-4" />
            {daysLeft(campaign.targetTimestamp)} days left
          </p>
          <p className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {campaign.contributors} contributors
          </p>
        </div>
      </div>
    </Link>
  );
};
