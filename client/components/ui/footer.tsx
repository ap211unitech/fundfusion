import { Copyright } from "lucide-react";

import { Theme } from "./theme";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <div className="min-h-[14rem] bg-accent dark:bg-black">
      <div className="mx-auto flex items-center justify-between px-4 xl:container sm:p-10">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="ml-2 flex items-center opacity-50">
            {new Date().getFullYear()}
            <Copyright className="mx-1 h-4 w-4" /> FundFusion. All rights
            reserved.
          </p>
        </div>
        <div className="[&>button]:bg-transparent">
          <Theme />
        </div>
      </div>
    </div>
  );
};
