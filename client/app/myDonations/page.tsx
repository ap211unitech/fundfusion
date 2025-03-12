import { ProtectedRoute } from "@/components/ui";
import { MyDonations } from "@/components/myDonations";

const Page = () => {
  return (
    <ProtectedRoute>
      <MyDonations />
    </ProtectedRoute>
  );
};

export default Page;
