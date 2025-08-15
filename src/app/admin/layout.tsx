import { SidebarProvider, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarContent, SidebarInset, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { Home, Newspaper, PenSquare, Sparkles, Settings, BarChart3, Users } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton href="/admin" tooltip="Dashboard">
                                    <Home />
                                    <span>Dashboard</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton href="/admin/analytics" tooltip="Analytics">
                                    <BarChart3 />
                                    <span>Analytics</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                             <SidebarGroup>
                                <SidebarGroupLabel>Content</SidebarGroupLabel>
                                <SidebarMenuItem>
                                    <SidebarMenuButton href="/admin/posts" tooltip="Posts">
                                        <Newspaper />
                                        <span>All Posts</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                 <SidebarMenuItem>
                                    <SidebarMenuButton href="/admin/posts/create" tooltip="Create Post">
                                        <PenSquare />
                                        <span>Create New</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                             </SidebarGroup>
                             <SidebarGroup>
                                <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
                                <SidebarMenuItem>
                                    <SidebarMenuButton href="/admin/tag-suggester" tooltip="AI Tagger">
                                        <Sparkles />
                                        <span>Tag Suggester</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                             </SidebarGroup>
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarContent className="mt-auto">
                        <SidebarMenu>
                             <SidebarMenuItem>
                                <SidebarMenuButton href="/admin/settings" tooltip="Settings">
                                    <Settings />
                                    <span>Settings</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                             <SidebarMenuItem>
                                <SidebarMenuButton href="/about" tooltip="About">
                                    <Users />
                                    <span>About Us</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
                <SidebarInset>
                    <main className="flex-grow p-4 md:p-8 bg-muted/40">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </div>
    </SidebarProvider>
  );
}
