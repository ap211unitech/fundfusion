import { Campaigns } from "@/components/campaigns";
import { SearchParams } from "@/types";

const Page = ({ searchParams }: { searchParams?: SearchParams }) => {
  return <Campaigns searchParams={searchParams} />;
};

export default Page;
