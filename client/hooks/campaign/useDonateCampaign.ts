import { parseUnits, BrowserProvider, Contract, Eip1193Provider } from "ethers";
import { useAppKitProvider } from "@reown/appkit/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { campaignabi } from "@/constants";

type Props = {
  amountToDonate: string;
  campaignAddress: string;
  cb?: () => void;
};

export const useDonateCampaign = () => {
  const router = useRouter();
  const { walletProvider } = useAppKitProvider("eip155");

  return useMutation({
    mutationFn: async ({ amountToDonate, campaignAddress, cb }: Props) => {
      const ethersProvider = new BrowserProvider(
        walletProvider as Eip1193Provider,
      );
      const signer = await ethersProvider.getSigner();

      const campaignContract = new Contract(
        campaignAddress,
        campaignabi,
        signer,
      );

      const tx = await campaignContract.donate({
        value: parseUnits(amountToDonate),
      });
      await tx.wait();

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
