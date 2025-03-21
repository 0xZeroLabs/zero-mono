<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
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
            <BreadcrumbPage href="#"> Dashboard </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>
  <main class="flex w-full h-full flex-col justify-center items-center">
    <h1 class="text-2xl font-bold text-center">Welcome to S3N ✦</h1>
    <p class="my-4 text-center">
      Get started with the confidential compute cloud.
    </p>
    <div class="flex flex-col items-center md:flex-row gap-3 mt-2">
      <nuxt-link to="/containers"
        ><Button>Deploy Application</Button></nuxt-link
      >
      <nuxt-link to="/storage"
        ><Button variant="secondary">Upload file to storage</Button></nuxt-link
      >
    </div>
  </main>
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
