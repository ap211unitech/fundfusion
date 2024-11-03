import { Edit, Plus } from "lucide-react";

import { Button } from "@/components/ui";

export const CreateCategory = () => {
  return (
    <Button className="flex items-center gap-1">
      <Plus className="h-4 w-4" />
      Create Category
    </Button>
  );
};

export const EditCategory = () => {
  return (
    <Button size="sm" className="flex items-center gap-1">
      <Edit className="h-4 w-4" /> Edit
    </Button>
  );
};
