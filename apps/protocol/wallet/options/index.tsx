import { ethers } from "ethers"
import React, { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { PinModal } from "~/pinmodal"
import { decryptWallet, encryptWallet } from "~/utlis"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import { Textarea } from "~components/ui/textarea"
import { useToast } from "~hooks/use-toast"

import "~/styles/global.css"
import { init } from "~kwil/kwil"

const storage = new Storage()

const OptionsIndex = () => {
  const [importValue, setImportValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPinModal, setShowPinModal] = useState(false)
  const [wallet, setWallet] = useState<
    ethers.HDNodeWallet | ethers.Wallet | null
  >(null)
  const [isDecrypting, setIsDecrypting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    document.body.classList.add("dark")
    checkStoredWallet()
  }, [])

  const checkStoredWallet = async () => {
    const storedWallet = await storage.get("encrypted_wallet")
    if (storedWallet) {
      setIsDecrypting(true)
      setShowPinModal(true)
    }
  }

  const handleImport = async () => {
    if (!importValue.trim()) {
      toast({
        title: "Import failed",
        description: "Please enter a seed phrase or private key",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      let importType: "seedPhrase" | "privateKey" = "seedPhrase"
      if (importValue.split(" ").length === 1) {
        importType = "privateKey"
      }
      let importedWallet: ethers.HDNodeWallet | ethers.Wallet
      if (importType === "seedPhrase") {
        importedWallet = ethers.Wallet.fromPhrase(importValue)
      } else {
        importedWallet = new ethers.Wallet(importValue)
      }
      setWallet(importedWallet)
      setShowPinModal(true)
      toast({
        title: "Wallet imported successfully",
        description: "Please set a PIN to encrypt your wallet"
      })
    } catch (error) {
      toast({
        title: "Import failed",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePinSubmit = async (pin: string) => {
    if (isDecrypting) {
      try {
        const encryptedWallet = await storage.get("encrypted_wallet")
        const decryptedWallet = await decryptWallet(encryptedWallet, pin)
        setWallet(decryptedWallet)
        init(decryptedWallet.privateKey)
        toast({
          title: "Wallet decrypted successfully",
          description: "Your wallet has been decrypted and is ready to use"
        })
      } catch (error) {
        toast({
          title: "Decryption failed",
          description: "Invalid PIN or corrupted wallet data",
          variant: "destructive"
        })
      }
    } else if (wallet) {
      try {
        const encryptedWallet = await encryptWallet(wallet, pin)
        await storage.set("encrypted_wallet", encryptedWallet)
        toast({
          title: "Wallet encrypted and stored",
          description: "Your wallet has been securely stored in the extension"
        })
      } catch (error) {
        toast({
          title: "Encryption failed",
          description: error.message,
          variant: "destructive"
        })
      }
    }
    setShowPinModal(false)
    setIsDecrypting(false)
  }

  const handlePinModalClose = () => {
    setShowPinModal(false)
    if (!isDecrypting) {
      setWallet(null)
      toast({
        title: "Wallet import cancelled",
        description: "Your wallet was not encrypted or stored",
        variant: "destructive"
      })
    }
    setIsDecrypting(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {wallet ? "Wallet Imported" : "Import Ethereum Wallet"}
          </CardTitle>
          <CardDescription>
            {wallet
              ? "Your wallet has been successfully imported."
              : "Enter your seed phrase or private key to import your wallet."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {wallet ? (
            <div className="space-y-2">
              <div className="p-2 bg-secondary text-sm rounded-md flex items-center justify-center">
                {wallet.address}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="importValue">Seed Phrase or Private Key</Label>
              <Textarea
                id="importValue"
                placeholder="Enter your 12 or 24 word seed phrase, or your private key"
                value={importValue}
                onChange={(e) => setImportValue(e.target.value)}
                className="h-32"
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!wallet && (
            <Button
              onClick={handleImport}
              disabled={isLoading}
              className="w-full">
              {isLoading ? "Importing..." : "Import Wallet"}
            </Button>
          )}
        </CardFooter>
      </Card>
      {showPinModal && (
        <PinModal
          onPinSet={handlePinSubmit}
          onClose={handlePinModalClose}
          isDecrypting={isDecrypting}
        />
      )}
    </div>
  )
}

export default OptionsIndex
