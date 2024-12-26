"use client";

import { Loader2, Trash2 } from "lucide-react";

import {
  Button,
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui";
import { Campaign } from "@/types";
import { useDeleteCampaign } from "@/hooks";

export const DeleteCampaign = ({ campaign }: { campaign: Campaign }) => {
  const { mutateAsync: onDeleteCampaign, isPending: isDeletingCampaign } =
    useDeleteCampaign();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="flex items-center gap-2">
          <Trash2 className="h-4 w-4" />
          Delete Campaign
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-medium text-destructive">
            <Trash2 className="h-4 w-4" />
            Delete Campaign
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this campaign? This action cannot be
            undone.
            <br />
            However, the campaign will still be accessible but it will marked as{" "}
            <span className="text-destructive">DELETED</span>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              No, Cancel
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            disabled={isDeletingCampaign}
            className="flex items-center gap-2"
            onClick={() =>
              onDeleteCampaign({ campaignAddress: campaign.address })
            }
          >
            {isDeletingCampaign ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Yes, Delete it
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
