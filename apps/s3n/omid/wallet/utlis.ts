import { ethers } from "ethers"

export function importWallet(
  importType: "seedPhrase" | "privateKey",
  importValue: string
): ethers.HDNodeWallet | ethers.Wallet {
    if (importType === "seedPhrase") {
      return ethers.Wallet.fromPhrase(importValue)
    } else {
      return new ethers.Wallet(importValue)
    }
}

export async function encryptWallet(wallet: ethers.HDNodeWallet | ethers.Wallet, pin: string): Promise<string> {
  try {
    return await wallet.encrypt(pin)
  } catch (error) {
    throw new Error("Failed to encrypt wallet")
  }
}

export async function decryptWallet(encryptedWallet: string, pin: string): Promise<ethers.HDNodeWallet | ethers.Wallet> {
  try {
    return await ethers.Wallet.fromEncryptedJson(encryptedWallet, pin)
  } catch (error) {
    throw new Error("Invalid PIN or corrupted wallet data")
  }
}