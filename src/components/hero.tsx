"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Feather, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border glass-card px-6 py-12 md:px-10 md:py-16 animate-fade-in">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="bg-grid-dark absolute inset-0 -z-10" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:gap-10 text-center md:text-left">
        <div className="flex items-center gap-4">
          <div className="shrink-0 rounded-xl bg-primary/10 p-4">
            <Feather className="h-10 w-10 text-primary" />
          </div>
          <p className="hidden md:block text-sm text-muted-foreground">Trusted insights since 2024</p>
        </div>

        <div className="flex-1 max-w-4xl">
          <h1 className="font-headline text-4xl md:text-6xl font-extrabold leading-tight">
            Level up your security with
            <span className="gradient-text"> expert analysis</span>
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Actionable articles on cybersecurity, AI, and cloud. Signal over noise, clarity over hype.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
            <Button asChild size="lg" variant="gradient" className="w-full sm:w-auto">
              <Link href="#latest">
                Explore Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="#newsletter">Subscribe</Link>
            </Button>
          </div>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border bg-card/60 p-4 text-center">
            <p className="text-2xl font-bold">99%</p>
            <p className="text-xs text-muted-foreground">Reader satisfaction</p>
          </div>
          <div className="rounded-xl border bg-card/60 p-4 text-center">
            <p className="text-2xl font-bold">+150</p>
            <p className="text-xs text-muted-foreground">In-depth articles</p>
          </div>
          <div className="rounded-xl border bg-card/60 p-4 text-center">
            <p className="text-2xl font-bold">24/7</p>
            <p className="text-xs text-muted-foreground">Fresh insights</p>
          </div>
          <div className="rounded-xl border bg-card/60 p-4 text-center">
            <p className="text-2xl font-bold">Pro</p>
            <p className="text-xs text-muted-foreground">Curated content</p>
          </div>
        </div>
      </div>
    </section>
  );
}


