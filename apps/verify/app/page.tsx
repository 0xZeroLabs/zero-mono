"use client"
import "@anima-protocol/personhood-sdk-react/style.css";
import { Personhood } from "@anima-protocol/personhood-sdk-react";

import { ethers } from 'ethers';

export default function Home() {
  const sign = async (message: string) => {
    const provider = new ethers.BrowserProvider((window as unknown as any).ethereum);
    const signer = provider.getSigner();
    const signature = await (await signer).signMessage(message);
    return signature as string;
  };

  const onFinish = ({ info, state }: { info: any; state: any }) => {
    console.log(info);
    console.log(state);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Personhood
        onFinish={onFinish}
        sessionId="f9387078-59f6-45fe-9fb7-4680c5c275c2"
        signCallback={async (payload: string | object) => {
          const message = typeof payload === 'string' ? payload : JSON.stringify(payload);
          return sign(message);
        }}
        walletAddress="0xbd989E712c030046f6cE34238437E06Ed6502f4B"
      />
    </div>
  );
}
