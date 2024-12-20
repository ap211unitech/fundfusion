export const CONFIG = {
  REOWN_PROJECT_ID: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID as string,
  IN_PRODUCTION: process.env.NODE_ENV === "production",
  CATEGORY_CONTRACT: process.env.NEXT_PUBLIC_CATEGORY_CONTRACT as string,
  FUNDFUSION_CONTRACT: process.env.NEXT_PUBLIC_FUNDFUSION_CONTRACT as string,
  IPFS_PROVIDER: {
    JWT_TOKEN: process.env.PINATA_JWT_TOKEN as string,
    GATEWAY: process.env.NEXT_PUBLIC_PINATA_GATEWAY as string,
  },
};
