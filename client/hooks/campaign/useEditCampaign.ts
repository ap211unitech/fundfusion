import { BrowserProvider, Contract, Eip1193Provider, ethers } from "ethers";
import { useAppKitProvider } from "@reown/appkit/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { campaignabi } from "@/constants";

type Props = {
  campaignAddress: string;
  title: string;
  category: string;
  description: string;
  image: string;
  targetAmount: string;
  cb?: () => void;
};

export const useEditCampaign = () => {
  const router = useRouter();
  const { walletProvider } = useAppKitProvider("eip155");

  return useMutation({
    mutationFn: async ({
      image,
      title,
      category,
      description,
      targetAmount,
      campaignAddress,
      cb,
    }: Props) => {
      const ethersProvider = new BrowserProvider(
        walletProvider as Eip1193Provider,
      );
      const signer = await ethersProvider.getSigner();

      const campaignContract = new Contract(
        campaignAddress,
        campaignabi,
        signer,
      );

      const tx = await campaignContract.editCampaign(
        title,
        category,
        description,
        image,
        ethers.parseUnits(targetAmount),
      );

      await tx.wait();

      cb?.();

      router.refresh();
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : (err as string));
    },
    onSuccess: () => {
      toast.success("Campaign updated successfully");
    },
  });
};
