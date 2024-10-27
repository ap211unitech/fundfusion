import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { AppKitNetwork, hardhat, sepolia } from "@reown/appkit/networks";

export const CONFIG = {
  REOWN_PROJECT_ID: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID as string,
  IN_PRODUCTION: process.env.NODE_ENV === "production",
  CATEGORY_CONTRACT: process.env.NEXT_PUBLIC_CATEGORY_CONTRACT as string,
  FUNDFUSION_CONTRACT: process.env.NEXT_PUBLIC_FUNDFUSION_CONTRACT as string,
};

/******************************* WalletConnect Modal config *******************************/
const projectId = CONFIG.REOWN_PROJECT_ID;

if (!projectId) {
  throw new Error("Reown Project ID is not defined");
}
const SUPPORTED_NETWORKS: [AppKitNetwork, ...AppKitNetwork[]] =
  CONFIG.IN_PRODUCTION ? [sepolia] : [hardhat];

//Set up the Wagmi Adapter (Config)
const WAGMI_ADAPTER = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks: SUPPORTED_NETWORKS,
});

export const CONNECT_WALLET_CONFIGS = {
  SUPPORTED_NETWORKS,
  WAGMI_ADAPTER,
};
