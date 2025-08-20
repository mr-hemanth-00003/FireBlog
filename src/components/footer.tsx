
'use client';
import Link from 'next/link';
import { Feather, Github, Twitter, Linkedin, Rss } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { NewsletterForm } from './newsletter-form';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import type { Settings } from '@/types/settings';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [socials, setSocials] = useState({ twitter: '#', github: '#', linkedin: '#' });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'site'), (doc) => {
        if (doc.exists()) {
            const settings = doc.data() as Settings;
            if (settings.social) {
                setSocials({
                    twitter: settings.social.twitter || '#',
                    github: settings.social.github || '#',
                    linkedin: settings.social.linkedin || '#',
                });
            }
        }
    });
    return () => unsub();
  }, []);

  return (
    <footer className="border-t bg-card/60 backdrop-blur-xl text-card-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-8">
          
          <div className="md:col-span-4 lg:col-span-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Feather className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold font-headline">FireBlog</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
            FireBlog.pro delivers expert blogs on cybersecurity, ethical hacking, AI, cloud security, and the latest technology trends. Stay informed and secure in the digital world.
            </p>
            <div id="newsletter">
              <NewsletterForm />
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-7 animate-fade-in animation-delay-200">
            <h3 className="font-semibold font-headline text-foreground mb-4">Navigation</h3>
            <nav className="flex flex-col gap-3">
             <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline underline-offset-4">Home</Link>
             <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline underline-offset-4">About</Link>
             <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline underline-offset-4">Contact</Link>
            </nav>
          </div>
          
          <div className="lg:col-span-2 animate-fade-in animation-delay-400">
            <h3 className="font-semibold font-headline text-foreground mb-4">Legal</h3>
            <nav className="flex flex-col gap-3">
             <Link href="/privacy-policy" className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline underline-offset-4">Privacy Policy</Link>
             <Link href="/terms-of-service" className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline underline-offset-4">Terms of Service</Link>
            </nav>
          </div>
          
          <div className="lg:col-span-2 animate-fade-in animation-delay-600">
            <h3 className="font-semibold font-headline text-foreground mb-4">Connect</h3>
             <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="icon" disabled={!socials.twitter || socials.twitter === '#'}>
                <Link href={socials.twitter || '#'} aria-label="Twitter" target="_blank">
                  <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" disabled={!socials.github || socials.github === '#'}>
                <Link href={socials.github || '#'} aria-label="GitHub" target="_blank">
                  <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              </Button>
               <Button asChild variant="ghost" size="icon" disabled={!socials.linkedin || socials.linkedin === '#'}>
                <Link href={socials.linkedin || '#'} aria-label="LinkedIn" target="_blank">
                  <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              </Button>
               <Button asChild variant="ghost" size="icon">
                <Link href="/rss.xml" aria-label="RSS Feed" target="_blank">
                  <Rss className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
           <p>&copy; {currentYear} FireBlog. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
