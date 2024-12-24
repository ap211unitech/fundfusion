"use client";

import { Edit } from "lucide-react";
import { useState } from "react";

import {
  Button,
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui";
import { Campaign } from "@/types";

import { EditCampaignForm } from "./form";

export const EditCampaign = ({
  campaign,
  categories,
}: {
  campaign: Campaign;
  categories: string[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Button className="flex items-center gap-2" variant="secondary">
          <Edit className="h-4 w-4" />
          Edit Campaign
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full px-4 xl:container sm:px-10">
          <DrawerHeader className="px-0">
            <DrawerTitle className="flex items-center gap-2 text-2xl text-primary">
              <Edit className="h-5 w-5 stroke-[3px]" />
              Edit Campaign
            </DrawerTitle>
          </DrawerHeader>
          <EditCampaignForm
            campaign={campaign}
            categories={categories}
            cb={() => setOpen(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
