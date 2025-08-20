
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { VisitorTracker } from '@/components/visitor-tracker';
import { ScrollToTop } from '@/components/scroll-to-top';
import type { Metadata, Viewport } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = process.env.NEXT_PUBLIC_SITE_TITLE || 'FireBlog';
  const description = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Modern blog powered by Next.js and Firebase';
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
  const keywords = (process.env.NEXT_PUBLIC_SITE_KEYWORDS || 'blog,nextjs,firebase,web development')
    .split(',')
    .map(k => k.trim());

  return {
    metadataBase: new URL(url),
    title,
    description,
    keywords,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      url,
      siteName: title,
      title,
      description,
      images: [
        {
          url: '/favicon.ico',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet" />
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
