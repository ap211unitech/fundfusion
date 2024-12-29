import { Eye, Logs, Plus } from "lucide-react";
import Link from "next/link";

import { getAllCategories } from "@/fetchers";
import { Button } from "@/components/ui";

import { CreateCategory, EditCategory } from "./actions";

export const ManageCategories = async () => {
  const categories = await getAllCategories();

  return (
    <div className="space-y-10 py-12">
      <h1 className="flex items-center gap-2 text-2xl font-medium text-primary">
        <Logs /> Manage all categories
      </h1>
      <div className="grid gap-6 lg:grid-cols-2">
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
          <CreateCategory allCategories={categories} />
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
                  className="flex items-center gap-2 px-5 align-middle [&:not(:last-child)]:border-b [&>div]:h-20"
                >
                  <div className="flex w-[150px] items-center gap-4 border-r sm:w-[200px]">
                    <span className="font-semibold text-primary">
                      {index + 1}.
                    </span>
                    <span>{category}</span>
                  </div>
                  <div className="flex items-center gap-4 px-4 [&>button]:max-w-fit">
                    <EditCategory categoryId={index} category={category} />
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Link href={`/campaigns?category=${category}`}>
                        <Eye className="h-4 w-4" />
                        View campaigns
                      </Link>
                    </Button>
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
