import { BrowserProvider, Contract, Eip1193Provider, ethers } from "ethers";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { campaignabi } from "@/constants";

type Props = {
  campaignAddress: string;
  title: string;
  categoryId: number;
  description: string;
  image: string;
  targetAmount: string;
  cb?: () => void;
};

export const useEditCampaign = () => {
  const router = useRouter();
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  return useMutation({
    mutationFn: async ({
      image,
      title,
      categoryId,
      description,
      targetAmount,
      campaignAddress,
      cb,
    }: Props) => {
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

      const tx = await campaignContract.editCampaign(
        title,
        categoryId,
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
