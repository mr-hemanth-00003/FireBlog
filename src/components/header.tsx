"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Feather, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/admin/tag-suggester', label: 'AI Tagger' },
  ];

  return (
    <header className="bg-card/80 backdrop-blur-lg sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <Feather className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg font-headline">FireBlog</span>
        </Link>
        
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

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t bg-card">
          <nav className="flex flex-col gap-1 p-4">
             {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-base font-medium rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground" onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            {isHomePage && onSearchChange && (
              <div className="flex items-center gap-2 pt-4">
                <Input 
                  type="search"
                  placeholder="Search..."
                  className="flex-grow"
                  value={searchQuery}
                  onChange={onSearchChange}
                />
                <Button variant="outline" size="icon" aria-label="Search">
                  <Search className="h-5 w-5"/>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
