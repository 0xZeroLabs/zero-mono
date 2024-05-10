import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();
const config: HardhatUserConfig = {
  solidity: "0.8.24",networks: {
    viction0: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY!],
    },
    mumbai: {
      url: "https://gateway.tenderly.co/public/polygon-mumbai",
      accounts: [process.env.PRIVATE_KEY!],
    }
  }
};

export default config;
