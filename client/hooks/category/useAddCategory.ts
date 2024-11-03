import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = { category: string; cb?: () => void };

export const useAddCategory = () => {
  return useMutation({
    mutationFn: async ({ category, cb }: Props) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
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
