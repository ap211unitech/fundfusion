import { ManageCategories } from "@/components/manageCategories";
import { ProtectedRoute } from "@/components/ui";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <ProtectedRoute>
      <ManageCategories />
    </ProtectedRoute>
  );
};

export default Page;
