import { Copyright } from "lucide-react";

import { Theme } from "./theme";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <div className="min-h-[14rem] bg-accent dark:bg-black">
      <div className="mx-auto flex items-center justify-between px-4 py-8 xl:container sm:p-10">
        <div className="flex flex-col gap-3">
          <Logo />
          <div className="flex flex-col opacity-50 sm:ml-1 sm:flex-row sm:gap-1">
            <div className="flex items-center">
              {new Date().getFullYear()}
              <Copyright className="mx-1 h-4 w-4" /> FundFusion.
            </div>
            <div>All rights reserved.</div>
          </div>
        </div>
        <div className="[&>button]:bg-transparent">
          <Theme />
        </div>
      </div>
    </div>
  );
};
