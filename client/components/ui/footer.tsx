import { Copyright } from "lucide-react";

import { Theme } from "./header/theme";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <div className="bg-accent dark:bg-black min-h-[14rem]">
      <div className="xl:container px-4 sm:p-10 mx-auto flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="flex items-center opacity-50 ml-2">
            {new Date().getFullYear()}
            <Copyright className="w-4 h-4 mx-1" /> FundFusion. All rights
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
