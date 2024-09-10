import { ethers } from "ethers";
import Link from "next/link";

import { Theme } from "./theme";

import { getProvider } from "@/lib/utils";
import { Button, Logo } from "@/components/ui";
import { CATEGORY_CONTRACT } from "@/constants";
import { categoryabi } from "@/constants/abi/category";

const getAllCategories = async () => {
  const provider = getProvider();
  const contract = new ethers.Contract(
    CATEGORY_CONTRACT,
    categoryabi,
    provider
  );
  return (await contract.getCategories()) as string[];
};

export const Header = async () => {
  const categories = await getAllCategories();

  return (
    <div className="border-b py-6">
      <div className="flex justify-between items-center xl:container px-4 xl:px-10 mx-auto">
        <div className="flex items-center gap-1">
          <Logo />
          <div className="hidden lg:flex gap-8 ml-8">
            {categories.map((c) => {
              return (
                <Link
                  href={`/campaigns?category=${c}`}
                  className="opacity-50 hover:text-primary hover:opacity-100"
                  key={c}
                >
                  {c}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Theme />
          <Button>Connect Wallet</Button>
        </div>
      </div>
    </div>
  );
};
