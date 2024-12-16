import { toHex } from "viem";
import { client, NFTInput, IPAsset } from "./utils";
import { Proof } from "tlsn-js/build/types";
import { verify } from "tlsn-js/src/";

export const registerNFTasIP = async (nftdata: NFTInput): Promise<IPAsset> => {
  const response = await client.ipAsset.register({
    nftContract: nftdata.nftContract,
    tokenId: nftdata.tokenId,
    // https://docs.story.foundation/docs/ip-asset#adding-nft--ip-metadata-to-ip-asset
    ipMetadata: {
      ipMetadataURI: nftdata.ipMetadata.ipMetadataURI,
      ipMetadataHash: toHex(nftdata.ipMetadata.ipMetadataHash, { size: 32 }),
      nftMetadataHash: toHex(nftdata.ipMetadata.nftMetadataHash, { size: 32 }),
      nftMetadataURI: nftdata.ipMetadata.nftMetadataURI,
    },
    txOptions: { waitForTransaction: true },
  });

  return { txHash: response.txHash, ipId: response.ipId };
};

export const verifyProof = async (
  proof: Proof,
): Promise<{
  time: number;
  sent: string;
  recv: string;
  notaryUrl: string;
}> => {
  return await verify(proof);
};
