
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Feather, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface HeaderProps {}

export function Header({}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="bg-card/80 backdrop-blur-lg sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2" onClick={() => { setIsMenuOpen(false);}}>
            <Feather className="h-6 w-6 text-primary transition-transform hover:rotate-12" />
            <span className="font-bold text-lg font-headline">FireBlog</span>
          </Link>
        </div>
        
        <nav className={cn("hidden md:flex gap-4 items-center")}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden flex items-center gap-2">
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

    </header>
  );
}
