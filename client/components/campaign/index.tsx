import { redirect } from "next/navigation";

import { SearchParams } from "@/types";

export const Campaign = ({ searchParams }: { searchParams?: SearchParams }) => {
  if (!searchParams) return redirect("/");

  const campaignId = searchParams.id as string;
  if (!campaignId) return redirect("/");

  return <div className="py-12">Campaign ID - {searchParams.id}</div>;
};
