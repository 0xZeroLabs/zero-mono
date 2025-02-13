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
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
// import { para } from "@/utils/para";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { h } from "vue";
import * as z from "zod";
import { RiGithubFill, RiArrowLeftLine } from "@remixicon/vue";
// import { OAuthMethod } from "@getpara/web-sdk";
import { authClient } from "~/lib/auth-client";

const isLoading = ref(true);
const authenticated = ref(false);
const session = authClient.useSession();
const emailed = ref(false);

definePageMeta({
  layout: authenticated.value ? "default" : false,
});

// authenticated.value = await para.isSessionActive();
watchEffect(() => {
  isLoading.value = session.value.isPending;
  authenticated.value = !!session.value.data?.user;
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

const handleOAuthAuthentication = async () => {
  const data = await authClient.signIn.social({
    provider: "github",
  });
};

// take them all to on-boarding page if they're new users
const handleSubmitEmail = async (email: string) => {
  const { data, error } = await authClient.signIn.magicLink({
    email: email,
    callbackURL: "/",
  });

  if (error) {
    console.error(error);
  }

  emailed.value = data?.status as boolean;
};

const goback = () => {
  emailed.value = false;
};
</script>

<template>
  <div
    v-if="isLoading"
    class="w-full h-screen flex items-center justify-center px-3"
  >
    <div class="loader"></div>
  </div>
  <div v-else-if="authenticated">
    <NuxtLayout name="default">
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
    </NuxtLayout>
  </div>
  <div v-else class="w-full h-screen flex items-center justify-center px-3">
    <Card class="mx-auto max-w-sm" v-if="!emailed">
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
            @click="handleOAuthAuthentication"
          >
            <RiGithubFill class="mr-1" />
            Continue with GitHub
          </Button>
        </form>
      </CardContent>
    </Card>
    <Card class="mx-auto max-w-sm" v-else>
      <CardHeader>
        <CardTitle class="text-2xl text-center"> Check your inbox </CardTitle>
        <CardDescription class="text-center">
          We've sent you an email with a magic link to authenticate yourself.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button type="button" class="w-full" @click="goback">
          <RiArrowLeftLine class="mr-1" /> Go back
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
