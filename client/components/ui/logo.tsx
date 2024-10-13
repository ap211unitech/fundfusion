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
      <div className="h-10 w-10 rounded-full border bg-primary p-0.5">
        <LogoIcon className="h-full w-full [&_path]:fill-primary-foreground" />
      </div>
      <h3
        className={classNames(
          "hidden text-2xl font-light tracking-wide text-primary sm:inline-block",
          font.className,
        )}
      >
        FundFusion
      </h3>
    </Link>
  );
};
