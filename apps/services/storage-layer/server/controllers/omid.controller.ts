import { ethers } from "ethers";
import omid from "./abi/OMID.json";

const config = useRuntimeConfig();
const tokenContract = config.omid;
const abi = omid.abi;

export const mint = async (toAddress: string) => {
  const network = config.public.rpc;
  const provider = new ethers.JsonRpcProvider(network);

  const contract = new ethers.Contract(tokenContract, abi, provider);
  const signer = new ethers.Wallet(config.privateKey!, provider);

  
  const data = contract.interface.encodeFunctionData("mint", [toAddress]);

  // creating and sending the transaction object
  try {
    const tx = await signer.sendTransaction({
      to: tokenContract,
      from: signer.address,
      value: ethers.parseUnits("0.000", "ether"),
      data: data,
    });

    const receipt = await tx.wait();

    let hashData = {
      url: `https://sepolia.scrollscan.io/tx/${tx.hash}`,
      message: `Mined in block ${receipt!.blockNumber}`,
    };

    return hashData;
  } catch (error) {
    let hashData = {
      url: "",
      message: `Error: ${error}`,
    };

    return hashData;
  }
};

export const hasHuman = async (toAddress: string) => {
  const network = config.public.rpc;
  const provider = new ethers.JsonRpcProvider(network);

  const contract = new ethers.Contract(tokenContract, abi, provider);

  

  // creating and sending the transaction object
  try {
    const _hasHuman = await contract.hasHuman(toAddress);
    

    let hashData = {
      pass: _hasHuman,
    };

    return hashData;
  } catch (error) {
    let hashData = {
      url: "",
      message: `Error: ${error}`,
      pass: false,
    };

    return hashData;
  }
};

export const isVerified = async (toAddress: string) => {
  const network = config.public.rpc;
  const provider = new ethers.JsonRpcProvider(network);

  const contract = new ethers.Contract(tokenContract, abi, provider);

  

  // creating and sending the transaction object
  try {
    const _isVerified = await contract.isVerified(toAddress);
    
    

    let hashData = {
      pass: _isVerified,
    };

    return hashData;
  } catch (error) {
    let hashData = {
      url: "",
      message: `Error: ${error}`,
      pass: false,
    };

    return hashData;
  }
};

export const getHuman = async (toAddress: string) => {
  const network = config.public.rpc;
  const provider = new ethers.JsonRpcProvider(network);

  const contract = new ethers.Contract(tokenContract, abi, provider);

  // creating and sending the transaction object
  try {
    let arr: any[] = [];
    
    return (await contract.getHuman(toAddress)).map((value: any) => value.toString());
  } catch (error) {
    return [];
  }
};

console.log(abi)