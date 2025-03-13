import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, Contract, Eip1193Provider } from "ethers";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { CONFIG } from "@/config";
import { refreshPage } from "@/fetchers";
import { categoryabi } from "@/constants";

type Props = { category: string; categoryId: number; cb?: () => void };

export const useEditCategory = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  return useMutation({
    mutationFn: async ({ category, categoryId, cb }: Props) => {
      if (!address || !walletProvider)
        throw new Error("Please connect your wallet");

      const ethersProvider = new BrowserProvider(
        walletProvider as Eip1193Provider,
      );

      const signer = await ethersProvider.getSigner(address);

      const categoryContract = new Contract(
        CONFIG.CATEGORY_CONTRACT,
        categoryabi,
        signer,
      );

      const tx = await categoryContract.editCategory(categoryId, category);
      await tx.wait();

      refreshPage(pathname);
      router.refresh();

      cb?.();
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : (err as string));
    },
    onSuccess: () => {
      toast.success("Category updated successfully");
    },
  });
};
