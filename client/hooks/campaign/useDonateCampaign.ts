import { parseUnits, BrowserProvider, Contract, Eip1193Provider } from "ethers";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { campaignabi } from "@/constants";
import { refreshPage } from "@/fetchers";

type Props = {
  amountToDonate: string;
  campaignAddress: string;
  cb?: () => void;
};

export const useDonateCampaign = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  return useMutation({
    mutationFn: async ({ amountToDonate, campaignAddress, cb }: Props) => {
      if (!address || !walletProvider)
        throw new Error("Please connect your wallet");

      const ethersProvider = new BrowserProvider(
        walletProvider as Eip1193Provider,
      );

      const signer = await ethersProvider.getSigner(address);

      const campaignContract = new Contract(
        campaignAddress,
        campaignabi,
        signer,
      );

      const tx = await campaignContract.donate({
        value: parseUnits(amountToDonate),
      });
      await tx.wait();

      refreshPage(pathname);
      router.refresh();

      cb?.();
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : (err as string));
    },
    onSuccess: () => {
      toast.success("Donated to the campaign successfully");
    },
  });
};
