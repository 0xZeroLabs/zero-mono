import { privateKeyToAccount, Address, Account } from "viem/accounts";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { http } from "viem";

// Add your private key to your .env file.
const privateKey: Address = `0x${process.env.WALLET_PRIVATE_KEY}`;
export const account: Account = privateKeyToAccount(privateKey);

// This is a pre-configured PIL Flavor: https://docs.story.foundation/docs/pil-flavors
export const NonCommercialSocialRemixingTermsId = "1";

// Add your rpc provider url to your .env file
// You can select from one of these: https://docs.story.foundation/docs/story-network#-rpcs
export const RPCProviderUrl =
  process.env.RPC_PROVIDER_URL || "https://rpc.odyssey.storyrpc.io";

const config: StoryConfig = {
  account: account, // the account object from above
  transport: http(RPCProviderUrl), // the RPC provider url from above
  chainId: "odyssey",
};

export const client = StoryClient.newClient(config);

/**
* we'll reset the following values in the future
*
// The currency used for paying License Tokens or tipping
// This address must be whitelisted by the protocol. You can see the
// currently whitelisted addresses here: https://docs.story.foundation/docs/royalty-module#whitelisted-revenue-tokens
export const SUSDAddress: Address = '0xC0F6E387aC0B324Ec18EAcf22EE7271207dCE3d5'

// Docs: https://docs.story.foundation/docs/deployed-smart-contracts
export const RoyaltyPolicyLAP: Address = '0x28b4F70ffE5ba7A26aEF979226f77Eb57fb9Fdb6'
*
*/

export type NFTInput = {
  nftContract: `0x${string}`;
  tokenId: string;
  ipMetadata: {
    ipMetadataURI: string;
    ipMetadataHash: string;
    nftMetadataHash: string;
    nftMetadataURI: string;
  };
  txOptions?: {
    waitForTransaction?: boolean;
  };
};

export interface IPAsset {
  ipId: string;
  txHash: string;
}
