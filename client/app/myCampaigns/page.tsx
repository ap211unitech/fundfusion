import { MyCampaigns } from "@/components/myCampaigns";
import { ProtectedRoute } from "@/components/ui";

const Page = () => {
  return (
    <ProtectedRoute>
      <MyCampaigns />
    </ProtectedRoute>
  );
};

export default Page;
