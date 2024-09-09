import { redirect } from "next/navigation";
import { ChevronsRight } from "lucide-react";

import { SearchParams } from "@/types";

import { Campaign } from "./campaign";

export const Campaigns = ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) => {
  if (!searchParams) return redirect("/");

  const category = searchParams?.category;
  if (!category) return redirect("/");

  return (
    <div className="space-y-10 py-12">
      <h1 className="text-2xl font-medium flex items-center gap-2">
        {category} <ChevronsRight />
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 5 }).map((_, i) => {
          return <Campaign key={i} />;
        })}
      </div>
    </div>
  );
};
