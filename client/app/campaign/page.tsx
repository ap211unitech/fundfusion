import { SearchParams } from "@/types";
import { Campaign } from "@/components/campaign";

const Page = ({ searchParams }: { searchParams?: SearchParams }) => {
  return <Campaign searchParams={searchParams} />;
};

export default Page;
