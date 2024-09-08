import Link from "next/link";

import { Theme } from "./theme";

import { Button, Logo } from "@/components/ui";

const categories = ["Art", "Comic", "Technology", "Gaming"];

export const Header = () => {
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
