import { BrowserProvider, Contract, Eip1193Provider } from "ethers";
import { useAppKitProvider } from "@reown/appkit/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { campaignabi } from "@/constants";

type Props = {
  campaignAddress: string;
  cb?: () => void;
};

export const useDeleteCampaign = () => {
  const router = useRouter();
  const { walletProvider } = useAppKitProvider("eip155");

  return useMutation({
    mutationFn: async ({ campaignAddress, cb }: Props) => {
      const ethersProvider = new BrowserProvider(
        walletProvider as Eip1193Provider,
      );
      const signer = await ethersProvider.getSigner();

      const campaignContract = new Contract(
        campaignAddress,
        campaignabi,
        signer,
      );

      const tx = await campaignContract.deleteCampaign();
      await tx.wait();

      router.refresh();

      cb?.();
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : (err as string));
    },
    onSuccess: () => {
      toast.success("Campaign marked as deleted");
    },
  });
};
