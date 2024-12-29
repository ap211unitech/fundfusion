import { BrowserProvider, Contract, Eip1193Provider, ethers } from "ethers";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CONFIG } from "@/config";
import { fundfusionabi } from "@/constants";

type Props = {
  title: string;
  categoryId: number;
  description: string;
  image: string;
  targetAmount: string;
  targetTimestamp: Date;
  cb?: () => void;
};

export const useCreateCampaign = () => {
  const router = useRouter();
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  return useMutation({
    mutationFn: async ({
      title,
      categoryId,
      description,
      image,
      targetAmount,
      targetTimestamp,
      cb,
    }: Props) => {
      if (!address || !walletProvider)
        throw new Error("Please connect your wallet");

      const ethersProvider = new BrowserProvider(
        walletProvider as Eip1193Provider,
      );

      const signer = await ethersProvider.getSigner(address);

      const fundfusionContract = new Contract(
        CONFIG.FUNDFUSION_CONTRACT,
        fundfusionabi,
        signer,
      );

      const tx = await fundfusionContract.createCampaign(
        title,
        categoryId,
        description,
        image,
        ethers.parseUnits(targetAmount),
        Math.ceil(targetTimestamp.getTime() / 1000),
        CONFIG.CATEGORY_CONTRACT,
      );
      await tx.wait();

      cb?.();

      router.push("/myCampaigns");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : (err as string));
    },
    onSuccess: () => {
      toast.success("Campaign created successfully");
    },
  });
};
