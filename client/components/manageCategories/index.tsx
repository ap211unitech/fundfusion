import { Logs, Plus } from "lucide-react";

import { getAllCategories } from "@/fetchers";

import { CreateCategory, EditCategory } from "./actions";

export const ManageCategories = async () => {
  const categories = await getAllCategories();

  return (
    <div className="space-y-10 py-12">
      <h1 className="flex items-center gap-2 text-2xl font-medium text-primary">
        <Logs /> Manage all categories
      </h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6 p-4">
          <div className="space-y-2">
            <h2 className="flex items-center gap-2 text-xl font-medium text-primary">
              <Plus /> Create new category
            </h2>
            <p className="opacity-50">
              When you create a new category, it will be added directly to the
              smart contract. Users will then be able to select this category
              when they set up their campaign.
            </p>
          </div>
          <CreateCategory />
        </div>
        <div className="space-y-4 p-4">
          <h2 className="flex items-center gap-2 text-xl font-medium text-primary">
            <Logs /> Available Categories
          </h2>
          <div className="flex flex-col border">
            {categories.map((category, index) => {
              return (
                <div
                  key={category}
                  className="flex items-center gap-2 align-middle [&:not(:last-child)]:border-b [&>div]:h-20"
                >
                  <div className="grid w-20 place-items-center border-r font-semibold text-primary">
                    {index + 1} .
                  </div>
                  <div className="grid basis-[400px] place-items-center border-r">
                    {category}
                  </div>
                  <div className="grid w-40 place-items-center">
                    <EditCategory category={category} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
