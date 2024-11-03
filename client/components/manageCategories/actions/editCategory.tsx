import { Edit } from "lucide-react";

import { Button } from "@/components/ui";

export const EditCategory = () => {
  return (
    <Button size="sm" className="flex items-center gap-1">
      <Edit className="h-4 w-4" /> Edit
    </Button>
  );
};
