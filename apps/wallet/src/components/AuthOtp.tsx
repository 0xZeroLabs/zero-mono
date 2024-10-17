/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LitAuthClient } from "@lit-protocol/lit-auth-client";
import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./ui/input-otp";
import { AuthMethodScope, ProviderType } from "@lit-protocol/constants";
// import { useState } from "react";

const fetchApiKey = async () => {
  const response = await fetch("http://localhost:3000/api/lit", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const apiKey = await response.json();
  return apiKey;
};
const FormSchema2 = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function AuthOtp() {
  const [isLoading, setIsLoading] = useState(false);
  const form2 = useForm<z.infer<typeof FormSchema2>>({
    resolver: zodResolver(FormSchema2),
    defaultValues: {
      pin: "",
    },
  });
  // const [pkp, setPkp] = useState<any>();

  const onSubmit = async (data: z.infer<typeof FormSchema2>) => {
    setIsLoading(true);
    const response = (await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        methodId: "method_id",
        code: "otp_code",
      }),
    })) as unknown as any;
    const provider = litAuthClient.initProvider(
      ProviderType.StytchEmailFactorOtp,
      {
        appId: "<YOUR_STYTCH_PROJECT_ID>",
      }
    );
    const authMethod = await provider.authenticate({
      session_jwt: response.session_jwt,
      user_id: response.user_id,
    });
    const options = {
      permittedAuthMethodScopes: [[AuthMethodScope.SignAnything]],
    };
    const mintTx = await provider.mintPKPThroughRelayer(authMethod, options);
    const pkps = await provider.fetchPKPsThroughRelayer(authMethod);
    setPkp(pkps);
    console.log(pkp);
  };

  return (
    <div className="modal p-6 max-w-[32rem] md:w-[91.666667%] font-SpaceGrotesk m-0">
      {enterEmail ? (
        <div className="w-full justify-center text-center">
          <h2 className="font-bold text-2xl"> Welcome, Get Started. </h2>
          <Form {...form1}>
            <form
              onSubmit={form1.handleSubmit(onSubmit)}
              className="max-w-[32rem] space-x-2"
            >
              <FormField
                control={form1.control}
                name="email"
                render={({ field }) => (
                  <div className="w-full">
                    <Input
                      type="email"
                      placeholder="Email"
                      className="w-full px-3 outline-1 mt-5"
                      {...field}
                    />
                    <FormMessage />
                    <Button
                      className="w-full px-3 outline-1 mt-2"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Submit'}
                    </Button>
                  </div>
                )}
              />
            </form>
          </Form>
        </div>
      ) : (
        <div className="w-full justify-center text-center">
          <h2 className="font-bold text-2xl"> Enter OTP. </h2>
          <Form {...form2}>
            <form
              onSubmit={form2.handleSubmit(console.log)}
              className="max-w-[32rem] space-x-2"
            >
              <FormField
                control={form2.control}
                name="pin"
                render={({ field }) => (
                  <div className="w-full flex flex-row mt-5">
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <FormMessage />

                    <Button
                      className="w-full px-3 outline-1 ml-2"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                )}
              />
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
