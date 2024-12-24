"use client";

import { Edit, TriangleAlert } from "lucide-react";
import { useState } from "react";

import {
  Alert,
  Button,
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  AlertDescription,
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
        <div className="mx-auto w-full px-4 pt-6 xl:container sm:px-10">
          <DrawerHeader className="px-0">
            <DrawerTitle className="flex items-center gap-2 text-2xl text-primary">
              <Edit className="h-5 w-5 stroke-[3px]" />
              Edit Campaign
            </DrawerTitle>
          </DrawerHeader>

          <Alert variant="warning" className="mb-4 flex items-center">
            <div>
              <TriangleAlert className="mr-2 h-4 w-4" />
            </div>
            <AlertDescription>
              The campaign&apos;s end date cannot be modified.
            </AlertDescription>
          </Alert>

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
