

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
import { Feather, LayoutDashboard, FileText, Settings, Archive, Home, LogOut, Loader2, MessageSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, onSnapshot, query, where, Timestamp } from 'firebase/firestore';

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
        icon: FileText,
        subItems: [
            { label: 'Published', href: '/admin/posts' },
            { label: 'Archived', href: '/admin/posts/archived' },
            { label: 'New Post', href: '/admin/posts/new' },
        ],
    },
    {
        label: 'Messages',
        href: '/admin/messages',
        icon: MessageSquare,
    },
    {
        label: 'Team',
        href: '/admin/team',
        icon: Users,
    },
    {
        label: 'Settings',
        href: '/admin/settings',
        icon: Settings,
    },
]

function UserMenu({ user }: { user: User | null }) {
    const { toast } = useToast();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast({
                title: 'Logged Out',
                description: 'You have been successfully logged out.',
            });
            router.push('/admin/login');
        } catch (error) {
            console.error("Error signing out: ", error);
            toast({
                title: 'Error',
                description: 'Failed to log out. Please try again.',
                variant: 'destructive',
            });
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.photoURL ?? "https://placehold.co/40x40.png"} alt={user?.displayName ?? "Admin"} />
                        <AvatarFallback>{user?.email?.charAt(0).toUpperCase() ?? 'A'}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.displayName ?? 'Admin'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
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
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function AdminHeader({ user }: { user: User | null }) {
    const { isMobile } = useSidebar();
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            {isMobile && <SidebarTrigger />}
            <div className="w-full flex-1">
                {/* Optional: Add search bar here later */}
            </div>
            <UserMenu user={user} />
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
                         'subItems' in item && item.subItems ? (
                            <SidebarMenuItem key={item.label}>
                                <SidebarMenuButton
                                    isActive={item.subItems.some(si => pathname === si.href || (si.href !== '/admin/posts' && pathname.startsWith(si.href)))}
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
                                                <SidebarMenuSubButton isActive={pathname === subItem.href}>
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
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        setUser(currentUser);
        if (pathname === '/admin/login') {
            router.replace('/admin/dashboard');
        }
      } else {
        setUser(null);
        if (pathname !== '/admin/login') {
            router.replace('/admin/login');
        }
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  // Handle push notifications for new messages
  React.useEffect(() => {
    if (!user) return;

    // 1. Request notification permission
    if (typeof window !== 'undefined' && "Notification" in window) {
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }

    // 2. Listen for new messages
    const messagesCollection = collection(db, 'contacts');
    // We only want to get notifications for messages that arrived after we logged in.
    const q = query(messagesCollection, where('date', '>', new Date().toISOString()));
    
    let isInitialLoad = true;

    const unsubscribe = onSnapshot(q, (snapshot) => {
       // Ignore the initial batch of documents
      if (isInitialLoad) {
        isInitialLoad = false;
        return;
      }
      
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            const message = change.doc.data();
            console.log("New message:", message);
            // 3. Show notification
            if (Notification.permission === "granted") {
                new Notification("New Contact Message", {
                    body: `From: ${message.name}\nMessage: ${message.message.substring(0, 100)}...`,
                    icon: '/favicon.ico' // Optional: Add an icon
                });
            }
        }
      });
    });

    return () => unsubscribe();
  }, [user]);

  if (loading || (!user && pathname !== '/admin/login')) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user && pathname === '/admin/login') {
      return <>{children}</>
  }

  if(user) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AdminSidebar />
                <div className="flex flex-col flex-1">
                    <AdminHeader user={user}/>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
  }

  return null;
}
