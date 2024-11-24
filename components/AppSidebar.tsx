"use client";

import * as React from "react";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Receipt, Rss } from "lucide-react";

type Props = {
  factionName: string;
  rankName: string;
  tagImage: string;
  sidebarProps?: React.ComponentProps<typeof Sidebar>;
};

export const AppSidebar = ({
  factionName,
  rankName,
  tagImage,
  ...sidebarProps
}: Props) => {
  return (
    <Sidebar variant="inset" {...sidebarProps}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center ">
                  <Image
                    src={`https://factiontags.torn.com/${tagImage}`}
                    alt=""
                    width={32}
                    height={32}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{factionName}</span>
                  <span className="truncate text-xs">{rankName}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Link href="/" className="flex items-center gap-2">
                  <Receipt className="w-4 h-4" />
                  <span>Crime Stats</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Link href="/changelog" className="flex items-center gap-2">
                  <Rss className="w-4 h-4" />
                  <span>Changelog</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
};
