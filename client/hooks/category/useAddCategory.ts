import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
import { toast } from "sonner";

import { CONFIG } from "@/config";
import { getProvider } from "@/lib/utils";
import { categoryabi } from "@/constants";

type Props = { category: string; cb?: () => void };

export const useAddCategory = () => {
  return useMutation({
    mutationFn: async ({ category, cb }: Props) => {
      const provider = getProvider();
      const contract = new ethers.Contract(
        CONFIG.CATEGORY_CONTRACT,
        categoryabi,
        provider,
      );

      // TODO: Complete it
      const signer = await provider.getSigner();
      const tx = await contract.createCategory(category);
      await tx.wait();

      cb?.();
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : (err as string));
    },
    onSuccess: () => {
      toast.success("Category created successfully");
    },
  });
};
