"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Feather, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from './ui/sidebar';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isAdminPage = pathname.startsWith('/admin');

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/admin', label: 'Admin' },
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  }

  return (
    <header className="bg-card/80 backdrop-blur-lg sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          {isAdminPage && <SidebarTrigger className="md:hidden" />}
          <Link href="/" className="flex items-center gap-2" onClick={() => { setIsMenuOpen(false); setIsSearchOpen(false);}}>
            <Feather className="h-6 w-6 text-primary transition-transform hover:rotate-12" />
            <span className="font-bold text-lg font-headline">FireBlog</span>
          </Link>
        </div>
        
        {isHomePage && onSearchChange && (
          <div className="hidden md:flex items-center gap-2 max-w-sm flex-grow">
            <Input 
              type="search"
              placeholder="Search for articles..."
              className="flex-grow"
              value={searchQuery}
              onChange={onSearchChange}
            />
            <Button variant="outline" size="icon" aria-label="Search">
              <Search className="h-5 w-5"/>
            </Button>
          </div>
        )}

        <nav className={cn("hidden md:flex gap-6 items-center")}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden flex items-center gap-2">
           {isHomePage && (
             <Button variant="ghost" size="icon" onClick={toggleSearch} aria-label="Toggle search">
                <Search className="h-6 w-6" />
             </Button>
           )}
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden border-t bg-card animate-accordion-down">
          <nav className="flex flex-col gap-1 p-4">
             {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-base font-medium rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground" onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
      
      {isSearchOpen && isHomePage && onSearchChange && (
          <div className="md:hidden border-t bg-card animate-accordion-down p-4">
            <div className="flex items-center gap-2">
                <Input 
                  type="search"
                  placeholder="Search for articles..."
                  className="flex-grow"
                  value={searchQuery}
                  onChange={onSearchChange}
                  autoFocus
                />
                <Button variant="outline" size="icon" aria-label="Search">
                  <Search className="h-5 w-5"/>
                </Button>
            </div>
          </div>
        )}

    </header>
  );
}