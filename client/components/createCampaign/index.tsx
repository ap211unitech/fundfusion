import { Plus } from "lucide-react";

import { getAllCategories } from "@/fetchers";

import { CreateCampaignForm } from "./form";

export const CreateCampaign = async () => {
  const categories = await getAllCategories();

  return (
    <div className="space-y-10 py-12">
      <h1 className="flex items-center gap-2 text-2xl font-medium text-primary">
        <Plus className="stroke-[3]" /> Create new campaign
      </h1>
      <CreateCampaignForm categories={categories} />
    </div>
  );
};
