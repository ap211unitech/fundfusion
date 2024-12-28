"use client";

import PolkadotIdenticon from "@polkadot/react-identicon";
import { IconTheme } from "@polkadot/react-identicon/types";
import { toast } from "sonner";

type Props = {
  address: string;
  size?: number;
  theme?: IconTheme;
};
export const Identicon = ({
  address,
  size = 24,
  theme = "ethereum",
}: Props) => {
  return (
    <div className="h-6 w-6 overflow-hidden rounded-full">
      <PolkadotIdenticon
        value={address}
        size={size}
        theme={theme}
        className="overflow-hidden rounded-full"
        onCopy={() => toast.success("Copied!")}
      />
    </div>
  );
};
