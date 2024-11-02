import { KwilSigner, Utils, WebKwil } from "@kwilteam/kwil-js"
import { ethers } from "ethers"

async function getSigner() {
  const network = ""
  const provider = new ethers.JsonRpcProvider(network)
  const ethSigner = await provider.getSigner()
  const ethAddress = await ethSigner.getAddress()

  return new KwilSigner(ethSigner, ethAddress)
}

const kwil = new WebKwil({
  kwilProvider: "https://longhorn.kwil.com",
  chainId: "longhorn-2"
})

let signer: ethers.HDNodeWallet | ethers.Wallet;

export const init = (privKey: string) => {
  signer = new ethers.Wallet(privKey)
}

export const createHuman = async () => {
  const kwilSigner = await getSigner()
  if (!signer) console.error("Signer not initialized")
  const dbid = Utils.generateDBID(signer.address, "zero_protocol")

  const result = await kwil.execute(
    {
      dbid,
      name: "create_human",
      inputs: []
    },
    kwilSigner
  )

  return result.data
}

export const updateHuman = async () => {
  const kwilSigner = await getSigner()
  if (!signer) console.error("Signer not initialized")
  const dbid = Utils.generateDBID(signer.address, "zero_protocol")

  const result = await kwil.execute(
    {
      dbid,
      name: "update_human",
      inputs: [
        {
          $verified: true
        }
      ]
    },
    kwilSigner
  )

  return result.data
}

export const getHuman = async ($id: string) => {
  const kwilSigner = await getSigner()
  if (!signer) console.error("Signer not initialized")
  const dbid = Utils.generateDBID(signer.address, "zero_protocol")

  const result = await kwil.execute(
    {
      dbid,
      name: "get_human",
      inputs: [
        {
          $id
        }
      ]
    },
    kwilSigner
  )

  return result.data
}