import Link from "next/link";

import { Theme } from "../theme";

import { ConnectWallet, Logo } from "@/components/ui";
import { getAllCategories } from "@/fetchers";

export const Header = async () => {
  const categories = await getAllCategories();

  return (
    <div className="border-b py-6">
      <div className="mx-auto flex items-center justify-between px-4 xl:container xl:px-10">
        <div className="flex items-center gap-1">
          <Logo />
          <div className="ml-8 hidden gap-8 lg:flex">
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
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
};
