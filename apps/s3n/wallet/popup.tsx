import {
  AvatarIcon,
  ComponentBooleanIcon,
  EnterFullScreenIcon,
  LockClosedIcon,
  UpdateIcon,
  BadgeIcon
} from "@radix-ui/react-icons"
import React, { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

import "~/styles/global.css"

import * as Comlink from "comlink"
import { ethers } from "ethers"
import { type Commit } from "tlsn-js"
import type { PresentationJSON } from "tlsn-js/build/types"

import { Button } from "~/components/ui/button"
import { useToast } from "~/hooks/use-toast"
import { PinModal } from "~/pinmodal"
import { decryptWallet } from "~/utlis"
import { init } from "~kwil/kwil"

const storage = new Storage()

export default function IndexPopup() {
  const [hasStoredWallet, setHasStoredWallet] = useState(false)
  const [showPinModal, setShowPinModal] = useState(false)
  const [wallet, setWallet] = useState<
    ethers.HDNodeWallet | ethers.Wallet | null
  >(null)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [hasHuman, setHashHuman] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    document.body.classList.add("dark")
    checkStoredWallet()
    try {
      fetch("http://localhost:3000/api/v1/omid/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: wallet.address
        })
      })
        .then((response) => response.json())
        .then((data) => {
          setHashHuman(data.response.pass)
        })
    } catch (error) {
      console.error(error)
    } finally {
      // setButtonLoading(false)
    }
  }, [wallet])

  const checkStoredWallet = async () => {
    const storedWallet = await storage.get("encrypted_wallet")
    setHasStoredWallet(!!storedWallet)
  }

  const handleDecryptClick = () => {
    setShowPinModal(true)
  }

  const mintIdentity = async () => {
    setButtonLoading(true)
    try {
      fetch("https://sbt-mvp.0xzero.org/api/v1/omid/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: wallet.address
        })
      })
    } catch (error) {
      console.error(error)
    } finally {
      setButtonLoading(false)
    }
  }

  const handlePinSubmit = async (pin: string) => {
    try {
      const encryptedWallet = await storage.get("encrypted_wallet")
      const decryptedWallet = await decryptWallet(encryptedWallet, pin)
      setWallet(decryptedWallet)
      init(decryptedWallet.privateKey)
      setShowPinModal(false)
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
  }

  const handlePinModalClose = () => {
    setShowPinModal(false)
  }

  return (
    <div className="p-4 h-[600px] w-[360px] flex flex-col justify-center items-center space-y-4">
      <div className="w-full h-8 top-0 flex items-center fixed">
        <div className="ml-auto">
          {" "}
          {/* Push the child to the right */}
          <button
            onClick={() => {
              window.open("/options.html", "_blank")
              window.focus()
            }}
            className="h-8 w-8 flex items-center justify-center">
            <EnterFullScreenIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {wallet ? (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Wallet Decrypted</h2>
          <p className="mb-4">Your wallet is ready to use.</p>
          <div className="bg-secondary p-2 rounded-md break-all mb-2">
            {wallet.address}
          </div>
          {hasHuman ? (
            <Button onClick={mintIdentity} disabled={buttonLoading}>
              {buttonLoading ? (
                <>
                  <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Minting...
                </>
              ) : (
                <>
                  <AvatarIcon className="mr-2 h-4 w-4" /> Mint Identity
                </>
              )}
            </Button>
          ) : (
            <>
              {isVerified ? (
                <p className="">Verified</p>
              ) : (
                <Button onClick={mintIdentity} disabled={buttonLoading}>
                  {buttonLoading ? (
                    <>
                      <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Verifying...
                    </>
                  ) : (
                    <>
                      <BadgeIcon className="mr-2 h-4 w-4" /> Verify Identity
                    </>
                  )}
                </Button>
              )}
            </>
          )}
        </div>
      ) : hasStoredWallet ? (
        <Button onClick={handleDecryptClick}>
          <LockClosedIcon className="mr-2 h-4 w-4" /> Decrypt Wallet
        </Button>
      ) : (
        <Button
          onClick={() => {
            window.open("/options.html", "_blank")
            window.focus()
          }}>
          <ComponentBooleanIcon className="mr-2 h-4 w-4" /> Import Wallet
        </Button>
      )}
      {showPinModal && (
        <PinModal
          onPinSet={handlePinSubmit}
          onClose={handlePinModalClose}
          isDecrypting={true}
        />
      )}
    </div>
  )
}

// Create a type-safe proxy to the worker
const worker = Comlink.wrap<any>(
  new Worker(new URL("./worker.ts", import.meta.url), { type: "module" })
)

type NotarizationMethod = "detailed" | "simplified"

interface NotarizationOptions {
  method: NotarizationMethod
  notaryUrl: string
  websocketProxyUrl: string
  apiEndpoint: string
}

async function notarizeFrom0xZero(options: NotarizationOptions) {
  await worker.init({ loggingLevel: "Info" })

  let presentationJSON: PresentationJSON | null = null

  if (options.method === "detailed") {
    presentationJSON = await notarizeDetailed(options)
  } else {
    presentationJSON = await notarizeSimplified(options)
  }

  if (presentationJSON) {
    return await verifyProof(presentationJSON, options.notaryUrl)
  }

  return null
}

async function notarizeDetailed(
  options: NotarizationOptions
): Promise<PresentationJSON | null> {
  try {
    const notary = await worker.NotaryServer.from(options.notaryUrl)
    const prover = await new worker.Prover({
      serverDns: new URL(options.apiEndpoint).hostname
    })

    await prover.setup(await notary.sessionUrl())
    await prover.sendRequest(options.websocketProxyUrl, {
      url: options.apiEndpoint,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const transcript = await prover.transcript()
    const commit: Commit = {
      sent: [
        transcript.ranges.sent.info!,
        transcript.ranges.sent.headers!["content-type"],
        transcript.ranges.sent.headers!["host"],
        ...transcript.ranges.sent.lineBreaks
      ],
      recv: [
        transcript.ranges.recv.info!,
        transcript.ranges.recv.headers!["server"],
        transcript.ranges.recv.headers!["date"],
        // Add more specific ranges based on the 0xZero response
        ...transcript.ranges.recv.lineBreaks
      ]
    }

    const notarizationOutputs = await prover.notarize(commit)

    const presentation = await new worker.Presentation({
      attestationHex: notarizationOutputs.attestation,
      secretsHex: notarizationOutputs.secrets,
      notaryUrl: notarizationOutputs.notaryUrl,
      websocketProxyUrl: notarizationOutputs.websocketProxyUrl,
      reveal: commit
    })

    return await presentation.json()
  } catch (error) {
    console.error("Detailed notarization failed:", error)
    return null
  }
}

async function notarizeSimplified(
  options: NotarizationOptions
): Promise<PresentationJSON | null> {
  try {
    return await worker.Prover.notarize({
      notaryUrl: options.notaryUrl,
      websocketProxyUrl: options.websocketProxyUrl,
      url: options.apiEndpoint,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      commit: {
        sent: [{ start: 0, end: 50 }],
        recv: [{ start: 0, end: 50 }]
      }
    })
  } catch (error) {
    console.error("Simplified notarization failed:", error)
    return null
  }
}

async function verifyProof(
  presentationJSON: PresentationJSON,
  notaryUrl: string
) {
  const proof = await new worker.Presentation(presentationJSON.data)
  const notary = await worker.NotaryServer.from(notaryUrl)
  const notaryKey = await notary.publicKey("hex")
  const verifierOutput = await proof.verify()
  const transcript = await new worker.Transcript({
    sent: verifierOutput.transcript.sent,
    recv: verifierOutput.transcript.recv
  })
  const vk = await proof.verifyingKey()

  return {
    time: verifierOutput.connection_info.time,
    verifyingKey: Buffer.from(vk.data).toString("hex"),
    notaryKey: notaryKey,
    serverName: verifierOutput.server_name,
    sent: transcript.sent(),
    recv: transcript.recv()
  }
}

// Usage example
async function runNotarization() {
  console.log("notarising")
  const result = await notarizeFrom0xZero({
    method: "detailed", // or 'simplified'
    notaryUrl: "https://tlsn.0xzero.org",
    websocketProxyUrl: "ws://localhost:55688",
    apiEndpoint: "https://swapi.dev/api/people/1"
  })

  if (result) {
    console.log("Notarization and verification successful:")
    console.log(JSON.stringify(result, null, 2))
  } else {
    console.log("Notarization or verification failed.")
  }
}
