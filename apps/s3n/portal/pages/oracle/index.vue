<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Slash } from "lucide-vue-next";

function goto(link: string) {
  useRouter().push(link);
}

useSeoMeta({
  title: "Data Oracle",
  ogTitle: "Data Oracle",
  description: "One-click TEE application deployment.",
  ogDescription: "One-click TEE application deployment.",
  ogImage: "/hero.png",
  twitterCard: "summary_large_image",
  twitterSite: "@s3ndotxyz",
});
</script>

<template>
  <header
    class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
  >
    <div class="flex items-center gap-2 px-4">
      <SidebarTrigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbLink class="cursor-pointer" @click="goto('/')">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator> </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage> Oracle </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>
  <main class="flex w-full h-full flex-col justify-center items-center">
    <h1 class="text-2xl font-semibold text-center">Not available yet..</h1>
  </main>
</template>
