import { Unbounded } from "next/font/google";
import classNames from "classnames";
import Link from "next/link";

import { Button } from "../button";

import { Theme } from "./theme";

import { Ethereum } from "@/icons";

const font = Unbounded({
  subsets: ["cyrillic-ext"],
  weight: ["200", "300", "400"],
});

const categories = ["Art", "Comic", "Technology", "Gaming"];

export const Header = () => {
  return (
    <div className="border-b py-6">
      <div className="flex justify-between items-center container mx-auto">
        <div className="flex items-center gap-1">
          <Link href="/" className="flex items-center gap-1">
            <Ethereum className="[&_path]:fill-primary w-10 h-10" />
            <h3
              className={classNames(
                "text-2xl tracking-wide font-light",
                font.className
              )}
            >
              FundFusion
            </h3>
          </Link>
          <div className="flex gap-8 ml-8">
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
