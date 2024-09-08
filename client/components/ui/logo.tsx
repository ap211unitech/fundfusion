import Link from "next/link";
import classNames from "classnames";
import { Unbounded } from "next/font/google";

import { Logo as LogoIcon } from "@/icons";

const font = Unbounded({
  subsets: ["cyrillic-ext"],
  weight: ["200", "300", "400"],
});

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-1 space-x-1">
      <div className="border rounded-full bg-primary w-10 h-10 p-0.5">
        <LogoIcon className="[&_path]:fill-primary-foreground w-full h-full" />
      </div>
      <h3
        className={classNames(
          "hidden text-2xl tracking-wide font-light sm:inline-block text-primary",
          font.className
        )}
      >
        FundFusion
      </h3>
    </Link>
  );
};
