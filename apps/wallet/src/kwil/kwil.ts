import { KwilSigner, Utils, WebKwil } from "@kwilteam/kwil-js";
import { ethers } from "ethers";

async function getSigner() {
  const network = "";
  const provider = new ethers.JsonRpcProvider(network);
  const ethSigner = await provider.getSigner();
  const ethAddress = await ethSigner.getAddress();

  return new KwilSigner(ethSigner, ethAddress);
}

const kwil = new WebKwil({
  kwilProvider: "https://longhorn.kwil.com",
  chainId: "longhorn-2",
});

const signer = new ethers.Wallet(""!);
const dbid = Utils.generateDBID(signer.address, "zero_protocol");

export const createHuman = async () => {
  const kwilSigner = await getSigner();

  const result = await kwil.execute(
    {
      dbid,
      name: "create_human",
      inputs: [
        {
          $verified: false,
        },
      ],
    },
    kwilSigner
  );

  return result.data;
}
