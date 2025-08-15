"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Feather } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          </nav>
        </div>
      )}
    </header>
  );
}
