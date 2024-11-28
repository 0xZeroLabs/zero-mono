import { useState } from "react"

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "~/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "~/components/ui/input-otp"
import { Label } from "~/components/ui/label"

interface PinModalProps {
  onPinSet: (pin: string) => void
  onClose: () => void
  isDecrypting: boolean
}

export function PinModal({ onPinSet, onClose, isDecrypting }: PinModalProps) {
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [buttonLoading, setButtonLoading] = useState(false)

  const handleSubmit = () => {
    if (pin.length < 6) {
      setError("PIN must be 6 digits")
      return
    }
    onPinSet(pin)
    setButtonLoading(true)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-xs rounded-[var(--radius)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isDecrypting ? "Enter PIN" : "Set PIN"}
          </DialogTitle>
          <DialogDescription>
            {isDecrypting
              ? "Enter your PIN to decrypt your wallet."
              : "Set a 6-digit PIN to encrypt your wallet. You'll need this PIN to access your wallet in the future."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pin">PIN</Label>
            <InputOTP maxLength={6} value={pin} onChange={setPin}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={4} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-2">
            <Button onClick={handleSubmit}>
              {isDecrypting ? (
                <>{buttonLoading ? "Decrypting..." : "Decrypt Wallet"}</>
              ) : (
                <>{buttonLoading ? "Preparing..." : "Set PIN"}</>
              )}
            </Button>
            <DialogClose asChild>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
