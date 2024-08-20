import Irys from "@irys-network/bundler-client";

const getIrys = async () => {
  const network = "testnet";
  // RPC URLs change often, use a recent one from https://chainlist.org/
  const providerUrl = "";
  const token = "matic";

  const irys = new Irys({
    network,
    token, // Token used for payment
    key: process.env.PRIVATE_KEY, // ETH or SOL private key
    config: { providerUrl }, // Optional provider URL, only required when using Devnet
  });
  return irys;
};

export const uploadData = async (data: string) => {
  const irys = await getIrys();
  try {
    const receipt = await irys.upload(data);
    console.log(
      `Data uploaded ==> https://testnet-gateway.irys.xyz/${receipt.id}`
    );
  } catch (e) {
    console.log("Error uploading data ", e);
  }
};

export const uploadFile = async (file: any) => {
  const irys = await getIrys();

  const tags = [{ name: "application-id", value: "Proof" }];

  try {
    const receipt = await irys.uploadFile(file, { tags: tags });
    console.log(
      `File uploaded ==> https://testnet-gateway.irys.xyz/${receipt.id}`
    );
  } catch (e) {
    console.log("Error uploading file ", e);
  }
};

export const uploadFolder = async (folder: any) => {
  const irys = await getIrys();
  
  try {
    const response = await irys.uploadFolder("./" + folder, {
      indexFile: "", // Optional index file (file the user will load when accessing the manifest)
      batchSize: 3, // Number of items to upload at once
      keepDeleted: false, // Whether to keep now deleted items from previous uploads
    });

    console.log(`Files uploaded. Manifest ID ${response.id}`);
  } catch (e) {
    console.log("Error uploading file ", e);
  }
};
