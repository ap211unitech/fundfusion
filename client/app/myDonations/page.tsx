import { ProtectedRoute } from "@/components/ui";
import { MyDonations } from "@/components/myDonations";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <ProtectedRoute>
      <MyDonations />
    </ProtectedRoute>
  );
};

export default Page;
