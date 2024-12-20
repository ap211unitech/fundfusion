"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAppKitAccount } from "@reown/appkit/react";
import { ReactNode, useEffect } from "react";

import { useCategoryAdmin } from "@/hooks";
import { Loading } from "@/components/ui";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const path = usePathname();
  const { address, status } = useAppKitAccount();
  const { data: isAdmin, isPending } = useCategoryAdmin();

  // For protected routes
  useEffect(() => {
    if (!address && status === "disconnected") router.push("/");

    if (path === "/manageCategories") {
      if (!isAdmin && !isPending) router.push("/");
    }
  }, [address, isAdmin, isPending, path, router, status]);

  if (!address) return <Loading />;

  return <>{children}</>;
};
