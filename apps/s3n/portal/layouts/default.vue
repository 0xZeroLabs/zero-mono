<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Collapsible } from "@/components/ui/collapsible";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  ChevronRight,
  CreditCard,
  LogOut,
  Plus,
  Sparkles,
  FileBox,
  BookOpen,
  BadgeHelp,
  Files,
  Folder,
  Moon,
  Sun,
} from "lucide-vue-next";

import {
  RiGithubLine,
  RiArrowRightUpLine,
  RiBuilding2Fill,
  RiEarthLine,
  RiFunctions,
  RiGlobalLine,
} from "@remixicon/vue";

import { authClient } from "~/lib/auth-client";

const toggleScheme = () => {
  const colorMode = useColorMode();
  colorMode.preference = colorMode.preference === "light" ? "dark" : "light";
};

const isLoading = ref(true);
const authenticated = ref(false);
const session = authClient.useSession();

watchEffect(() => {
  isLoading.value = session.value.isPending;
  authenticated.value = !!session.value.data?.user;
  !authenticated.value ? goauth() : null;
});

// This is sample data.
const data = {
  user: {
    name: "Ewan G.Okugbe",
    email: "lordewan@0xzero.org",
    avatar: "/avatars/profile.jpg",
  },
  teams: [
    {
      name: "ZERO Labs",
      logo: RiBuilding2Fill,
      plan: "Free plan",
    },
  ],
  navMain: [
    {
      title: "Services",
      url: "#",
      icon: RiEarthLine,
      items: [
        {
          title: "Applications",
          url: "/applications",
          icon: FileBox,
        },
        {
          title: "Functions",
          url: "/functions",
          icon: RiGlobalLine,
        },
      ],
      isActive: true,
    },
    {
      title: "Storage",
      url: "/storage",
      icon: Folder,
    },
    {
      title: "Data Oracle",
      url: "/oracle",
      icon: Sparkles,
    },
  ],
  resources: [
    {
      name: "GitHub",
      url: "https://github.com/0xzerolabs/s3n",
      icon: RiGithubLine,
    },
    {
      name: "Docs",
      url: "https://docs.s3n.xyz",
      icon: BookOpen,
    },
    {
      name: "Need help?",
      url: "https://t.me/s3ndotxyz",
      icon: BadgeHelp,
    },
  ],
};

const activeTeam = ref(data.teams[0]);

const isActive = (url: string) => {
  return useRoute().path.startsWith(url);
};

function setActiveTeam(team: (typeof data.teams)[number]) {
  activeTeam.value = team;
}

function goto(link: string) {
  useRouter().push(link);
}

function goauth() {
  useRouter().push("/authenticate");
}

const logout = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        useRouter().push("/");
      },
    },
  });
};
</script>

<template>
  <div
    v-if="isLoading || !authenticated"
    class="w-full h-screen flex items-center justify-center px-3"
  >
    <div class="flex space-x-2 justify-center items-center h-screen">
      <div
        class="h-4 w-4 bg-[#729171] rounded-full animate-bounce [animation-delay:-0.3s]"
      ></div>
      <div
        class="h-4 w-4 bg-[#729171] rounded-full animate-bounce [animation-delay:-0.15s]"
      ></div>
      <div class="h-4 w-4 bg-[#729171] rounded-full animate-bounce"></div>
    </div>
  </div>
  <SidebarProvider v-else-if="authenticated">
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div
                    class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                  >
                    <component :is="activeTeam.logo" class="size-4" />
                  </div>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{
                      activeTeam.name
                    }}</span>
                    <span class="truncate text-xs">{{ activeTeam.plan }}</span>
                  </div>
                  <ChevronsUpDown class="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side="bottom"
                :side-offset="4"
              >
                <DropdownMenuLabel class="text-xs text-muted-foreground">
                  Teams
                </DropdownMenuLabel>
                <DropdownMenuItem
                  v-for="(team, index) in data.teams"
                  :key="team.name"
                  class="gap-2 p-2"
                  @click="setActiveTeam(team)"
                  :class="{
                    'bg-sidebar-accent text-sidebar-accent-foreground':
                      activeTeam.name === team.name,
                  }"
                >
                  <div
                    class="flex size-6 items-center justify-center rounded-sm border"
                  >
                    <component :is="team.logo" class="size-4 shrink-0" />
                  </div>
                  {{ team.name }}
                  <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="gap-2 p-2">
                  <div
                    class="flex size-6 items-center justify-center rounded-md border bg-background"
                  >
                    <Plus class="size-4" />
                  </div>
                  <div class="font-medium text-muted-foreground">Add team</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu v-for="item in data.navMain" :key="item.title">
            <SidebarMenuItem v-if="!item.items">
              <SidebarMenuButton
                class="cursor-pointer"
                :class="{
                  'bg-sidebar-accent text-sidebar-accent-foreground': isActive(
                    item.url,
                  ),
                }"
                @click="goto(item.url)"
                as-child
              >
                <div>
                  <component :is="item.icon" />
                  <span class="">{{ item.title }}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <Collapsible
              v-else
              as-child
              :default-open="
                item.isActive ||
                item.items.some((subItem) => isActive(subItem.url))
              "
              class="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="item.title">
                    <component :is="item.icon" v-if="item.icon" />
                    <span>{{ item.title }}</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem
                      v-for="subItem in item.items"
                      :key="subItem.title"
                    >
                      <SidebarMenuButton
                        class="cursor-pointer"
                        :class="{
                          'bg-sidebar-accent text-sidebar-accent-foreground':
                            isActive(subItem.url),
                        }"
                        @click="goto(subItem.url)"
                        as-child
                      >
                        <div>
                          <component :is="subItem.icon" />
                          <span class="">{{ subItem.title }}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup class="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in data.resources" :key="item.name">
              <SidebarMenuButton as-child>
                <a :href="item.url" class="peer">
                  <component :is="item.icon" />
                  <span>{{ item.name }}</span>
                </a>
                <RiArrowRightUpLine
                  class="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 peer-hover:opacity-100 transition-opacity duration-300"
                  size="16"
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarImage
                      :src="data.user.avatar"
                      :alt="data.user.name"
                    />
                    <AvatarFallback class="rounded-lg"> EG </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{
                      data.user.name
                    }}</span>
                    <span class="truncate text-xs">{{ data.user.email }}</span>
                  </div>
                  <ChevronsUpDown class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                :side-offset="4"
              >
                <DropdownMenuLabel class="p-0 font-normal">
                  <div
                    class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                  >
                    <Avatar class="h-8 w-8 rounded-lg">
                      <AvatarImage
                        :src="data.user.avatar"
                        :alt="data.user.name"
                      />
                      <AvatarFallback class="rounded-lg"> EG </AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{
                        data.user.name
                      }}</span>
                      <span class="truncate text-xs">{{
                        data.user.email
                      }}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    @click="goto('/billing')"
                    :class="{
                      'bg-sidebar-accent text-sidebar-accent-foreground':
                        isActive('/billing'),
                    }"
                  >
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    :class="{
                      'bg-sidebar-accent text-sidebar-accent-foreground':
                        isActive('/account'),
                    }"
                  >
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    :class="{
                      'bg-sidebar-accent text-sidebar-accent-foreground':
                        isActive('/notifications'),
                    }"
                  >
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  class="hidden dark:flex"
                  @click="toggleScheme"
                >
                  <Sun />
                  Light Theme
                </DropdownMenuItem>
                <DropdownMenuItem class="dark:hidden" @click="toggleScheme">
                  <Moon />
                  Dark Theme
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="logout">
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>
