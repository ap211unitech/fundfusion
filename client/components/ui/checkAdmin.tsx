"use client";

import { useAppKitAccount } from "@reown/appkit/react";
import { ReactNode, useEffect } from "react";

import { useCategoryAdmin } from "@/hooks";
import { useRouter } from "next/navigation";

export const CheckAdmin = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { address } = useAppKitAccount();
  const { data: isAdmin, isLoading } = useCategoryAdmin();

  useEffect(() => {
    if (address && !isAdmin && !isLoading) router.push("/");
  }, [address, isAdmin, router, isLoading]);

  return <>{children}</>;
};
