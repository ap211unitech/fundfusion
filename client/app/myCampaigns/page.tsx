import { MyCampaigns } from "@/components/myCampaigns";
import { ProtectedRoute } from "@/components/ui";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <ProtectedRoute>
      <MyCampaigns />
    </ProtectedRoute>
  );
};

export default Page;
