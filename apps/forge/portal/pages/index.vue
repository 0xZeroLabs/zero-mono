<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { para } from "@/utils/para";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { h } from "vue";
import * as z from "zod";
import { RiGoogleFill } from "@remixicon/vue";
import { OAuthMethod } from "@getpara/web-sdk";

const authenticated = ref(false);

definePageMeta({
  layout: authenticated.value ? "default" : false,
});

authenticated.value = await para.isSessionActive();

watchEffect(() => {
  setPageLayout(authenticated.value ? "default" : false);
});

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email("Enter a valid email address"),
  }),
);

const { handleSubmit, isFieldDirty } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  handleSubmitEmail(values.email);
});

const handleOAuthAuthentication = async (method: OAuthMethod) => {
  const oAuthURL = await para.getOAuthURL({ method });
  window.open(oAuthURL, "oAuthPopup", "popup=true");

  const { email, userExists } = await para.waitForOAuth();

  const authUrl = userExists
    ? await para.initiateUserLogin({ email: email ?? "", useShortUrl: false })
    : await para.getSetUpBiometricsURL({
        authType: "email",
        isForNewDevice: false,
      });

  const popupWindow = window.open(
    authUrl,
    userExists ? "loginPopup" : "signUpPopup",
    "popup=true",
  ) as Window;

  const result = await (userExists
    ? para.waitForLoginAndSetup({ popupWindow })
    : para.waitForPasskeyAndCreateWallet());

  if ("needsWallet" in result && result.needsWallet) {
    await para.createWallet({ skipDistribute: false });
  }
  if ("recoverySecret" in result) {
    const recoverySecret = result.recoverySecret;
    console.log(recoverySecret);
  }
};

const handleSubmitEmail = async (email: string) => {
  await para.logout({ clearPregenWallets: false });

  let userExists = false;

  userExists = await para.checkIfUserExists({ email });

  if (userExists) {
    const authUrl = await para.initiateUserLogin({
      email,
      useShortUrl: false,
    });

    const popupWindow = window.open(
      authUrl,
      userExists ? "loginPopup" : "signUpPopup",
      "popup=true",
    ) as Window;

    const result = await (userExists
      ? para.waitForLoginAndSetup({ popupWindow })
      : para.waitForPasskeyAndCreateWallet());

    if ("needsWallet" in result && result.needsWallet) {
      await para.createWallet({ skipDistribute: false });
    }
    if ("recoverySecret" in result) {
      const recoverySecret = result.recoverySecret;
      console.log(recoverySecret);
    }
    return;
  }

  await para.createUser({ email });
};
</script>

<template>
  <div v-if="authenticated">
    <header
      class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
    >
      <div class="flex items-center gap-2 px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbPage href="#"> Dashboard </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
    <main class="flex w-full h-full flex-col justify-center items-center">
      <h1 class="text-2xl font-bold text-center">
        Welcome to The Forge Portal
      </h1>
      <p class="my-4 text-center">Where do you want to start?</p>
      <div class="flex flex-col items-center md:flex-row gap-3 mt-2">
        <nuxt-link to="/projects"
          ><Button>Start a new project</Button></nuxt-link
        >
        <nuxt-link to="/schemas"
          ><Button variant="secondary">Write schema</Button></nuxt-link
        >
      </div>
    </main>
  </div>
  <div v-else class="w-full h-screen flex items-center justify-center px-3">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl text-center"> Welcome </CardTitle>
        <CardDescription class="text-center">
          Start registering Verifiable Intellectual Property on Story.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit" class="grid gap-4">
          <FormField
            v-slot="{ componentField }"
            name="email"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem v-auto-animate>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit" class="w-full"> Continue </Button>
          <Separator class="my-4" label="Or" />
          <Button
            type="button"
            variant="outline"
            class="w-full"
            @click="handleOAuthAuthentication(OAuthMethod.GOOGLE)"
          >
            <RiGoogleFill class="mr-1" />
            Continue with Google
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
