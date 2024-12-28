import Image from "next/image";

import { trimString } from "@/lib/utils";
import { Identicon } from "@/components/ui";

const contributions = [
  {
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    amount: 10,
  },
  {
    address: "0xbfE3BfcFa92198384e40aF095b9f3167F16d3430",
    amount: 100,
  },
  {
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    amount: 13,
  },
  {
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    amount: 40,
  },
  {
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    amount: 0.5,
  },
  {
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    amount: 10,
  },
  {
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    amount: 100,
  },
  {
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    amount: 13,
  },
  {
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    amount: 40,
  },
  {
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    amount: 0.5,
  },
];

export const RecentContributions = () => {
  return (
    <div className="space-y-3 rounded-xl border border-primary px-5 py-4">
      <h2 className="text-lg text-primary">Recent Contributions</h2>
      <div className="max-h-40 space-y-4 overflow-auto pr-5">
        {contributions.map((contribution, index) => {
          return (
            <div
              key={contribution.address + index}
              className="grid grid-cols-2"
            >
              <div className="flex items-center gap-2 text-secondary">
                <div>
                  <Identicon address={contribution.address} />
                </div>
                <p>{trimString(contribution.address, 12)}</p>
              </div>
              <div className="flex items-center gap-2 justify-self-end text-lg">
                {contribution.amount} ETH
                <Image
                  src="/ethereum.webp"
                  alt="ethereum"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
