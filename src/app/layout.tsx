import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { VisitorTracker } from '@/components/visitor-tracker';
import { ScrollToTop } from '@/components/scroll-to-top';
import type { Viewport } from 'next';
import { LiveMetadata } from '@/components/live-metadata';
import { ptSans, sourceCodePro } from '@/lib/fonts';

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${ptSans.variable} ${sourceCodePro.variable} dark`}>
      <head>
        <LiveMetadata />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="color-scheme" content="dark" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3347120637586448" crossOrigin="anonymous"></script>
      </head>
      <body className="font-body antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">Skip to content</a>
        <VisitorTracker />
        {children}
        <ScrollToTop />
        <Toaster />
      </body>
    </html>
  );
}