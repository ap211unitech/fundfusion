import { Button } from "@/components/ui";
import { Edit, Plus } from "lucide-react";

export const CreateCategory = () => {
  return (
    <Button className="flex items-center gap-1">
      <Plus className="h-4 w-4" />
      Create
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
