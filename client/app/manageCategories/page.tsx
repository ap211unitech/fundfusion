import { ManageCategories } from "@/components/manageCategories";
import { ProtectedRoute } from "@/components/ui";

const Page = () => {
  return (
    <ProtectedRoute>
      <ManageCategories />
    </ProtectedRoute>
  );
};

export default Page;
