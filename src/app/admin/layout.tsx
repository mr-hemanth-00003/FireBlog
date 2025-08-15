

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  useSidebar
} from '@/components/ui/sidebar';
import { Feather, LayoutDashboard, FileText, Settings, Bot, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Toaster } from "@/components/ui/toaster";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
    {
        label: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
    },
    {
        label: 'Posts',
        href: '/admin/posts',
        icon: FileText,
    },
    {
        label: 'AI Tools',
        icon: Bot,
        subItems: [
            {
                label: 'Tag Suggester',
                href: '/admin/tools/tag-suggester',
            },
        ],
    },
    {
        label: 'Settings',
        href: '/admin/settings',
        icon: Settings,
    },
]

function UserMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/40x40.png" alt="Admin" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin</p>
                    <p className="text-xs leading-none text-muted-foreground">
                    admin@fireblog.com
                    </p>
                </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/"><Home className="mr-2 h-4 w-4" /><span>View Site</span></Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                     <Link href="/admin/settings"><Settings className="mr-2 h-4 w-4" /><span>Settings</span></Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function AdminHeader() {
    const { isMobile } = useSidebar();
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            {isMobile && <SidebarTrigger />}
            <div className="w-full flex-1">
                {/* Optional: Add search bar here later */}
            </div>
            <UserMenu />
        </header>
    )
}

function AdminSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader>
                <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
                    <Feather className="h-6 w-6 text-primary" />
                    <span className="text-lg">FireBlog</span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="p-2">
                <SidebarMenu>
                    {navItems.map((item) => (
                        item.subItems ? (
                            <SidebarMenuItem key={item.label}>
                                <SidebarMenuButton
                                    isActive={item.subItems.some(si => pathname.startsWith(si.href))}
                                    className="justify-between"
                                >
                                    <div className="flex items-center gap-2">
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </div>
                                </SidebarMenuButton>
                                <SidebarMenuSub>
                                    {item.subItems.map(subItem => (
                                        <SidebarMenuSubItem key={subItem.label}>
                                            <Link href={subItem.href}>
                                                <SidebarMenuSubButton isActive={pathname.startsWith(subItem.href)}>
                                                    {subItem.label}
                                                </SidebarMenuSubButton>
                                            </Link>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </SidebarMenuItem>
                        ) : (
                             <SidebarMenuItem key={item.label}>
                                <Link href={item.href}>
                                    <SidebarMenuButton isActive={pathname.startsWith(item.href)}>
                                         <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        )
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
        <div className="flex min-h-screen w-full">
            <AdminSidebar />
            <div className="flex flex-col flex-1">
                 <AdminHeader />
                 <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
                    {children}
                 </main>
            </div>
        </div>
    </SidebarProvider>
  );
}
