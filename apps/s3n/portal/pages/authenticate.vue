<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { RiGithubFill, RiArrowLeftLine } from "@remixicon/vue";
import { authClient } from "~/lib/auth-client";

const isLoading = ref(true);
const authenticated = ref(false);
const session = authClient.useSession();
const emailed = ref(false);

definePageMeta({
  layout: false,
});

// authenticated.value = await para.isSessionActive();
watchEffect(() => {
  isLoading.value = session.value.isPending;
  authenticated.value = !!session.value.data?.user;
  authenticated.value ? gohome() : null;
});

function gohome() {
  useRouter().replace("/");
}

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
  <div v-else class="w-full h-screen flex items-center justify-center px-3">
    <Card class="mx-auto max-w-sm" v-if="!emailed">
      <CardHeader>
        <CardTitle class="text-2xl text-center"> Welcome ✦ </CardTitle>
        <CardDescription class="text-center">
          One-click TEE application deployment platform.
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
        <div class="w-full flex justify-center mt-4">
          <nuxt-link
            class="flex items-center justify-center w-fit"
            to="https://www.s3n.xyz"
          >
            <p class="mr-2">Brought to you by</p>
            <img src="@/assets/img/s3n.svg" class="h-[28px] w-fit" alt="S3N" />
          </nuxt-link>
        </div>
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

<style scoped>
button {
  @apply font-semibold capitalize !important;
}
</style>

<style>
button {
  @apply rounded-lg !important;
}
</style>
