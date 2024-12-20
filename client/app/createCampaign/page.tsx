import { CreateCampaign } from "@/components/createCampaign";
import { ProtectedRoute } from "@/components/ui";

const Page = () => {
  return (
    <ProtectedRoute>
      <CreateCampaign />
    </ProtectedRoute>
  );
};

export default Page;
