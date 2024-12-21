import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { IpfsResponse } from "@/types";

type Props = { file: File };

export const useIpfs = () => {
  return useMutation({
    mutationFn: async ({ file }: Props) => {
      toast.info("Uploading image to IPFS");

      const formData = new FormData();
      formData.append("file", file);

      const data = await fetch("/ipfs", { body: formData, method: "POST" });
      const res: IpfsResponse = await data.json();

      if (res.status !== 200)
        throw new Error("Something went wrong while uploading to IPFS");

      return res;
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : (err as string));
    },
  });
};
