import { ManageCategories } from "@/components/manageCategories";
import { CheckAdmin } from "@/components/ui";

const Page = () => {
  return (
    <CheckAdmin>
      <ManageCategories />
    </CheckAdmin>
  );
};

export default Page;
