import { PinataSDK } from "pinata-web3";

import { IpfsResponse } from "@/types";
import { CONFIG } from "@/config";

export async function GET() {
  return Response.json({ message: "IPFS GET Request" });
}

export async function POST(req: Request) {
  const ipfs = new PinataSDK({
    pinataJwt: CONFIG.IPFS_PROVIDER.JWT_TOKEN,
    pinataGateway: CONFIG.IPFS_PROVIDER.GATEWAY,
  });

  const formData = await req.formData();

  const file = formData.get("file") as File;

  const data = await ipfs.upload.file(file);

  return Response.json({
    status: 200,
    ...data,
  } as IpfsResponse);
}
