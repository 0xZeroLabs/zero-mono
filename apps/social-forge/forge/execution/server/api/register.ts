import { registerNFTasIP, verifyProof } from "~/controllers/functions";
import { client } from "~/controllers/utils";
import { IpMetadata } from "@story-protocol/core-sdk";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
  //   title: "My IP Asset",
  //   description: "This is a test IP asset",
  //   watermarkImg: "https://picsum.photos/200",
  //   attributes: [
  //     {
  //       key: "Rarity",
  //       value: "Legendary",
  //     },
  //   ],
  // });

  const response = await registerNFTasIP();
  return {
    response,
  };
});
