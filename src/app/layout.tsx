
'use client';

import { useEffect, useState } from 'react';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { VisitorTracker } from '@/components/visitor-tracker';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import type { SettingsFormValues } from './admin/settings/page';

function LiveMetadata() {
  const [settings, setSettings] = useState<SettingsFormValues | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'site'), (doc) => {
      if (doc.exists()) {
        setSettings(doc.data() as SettingsFormValues);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (settings) {
      document.title = settings.siteTitle;
      
      const setMetaTag = (name: string, content: string) => {
        let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
        if (!element) {
          element = document.createElement('meta');
          element.name = name;
          document.head.appendChild(element);
        }
        element.content = content;
      };

      setMetaTag('description', settings.metaDescription);
      setMetaTag('keywords', settings.metaKeywords);
    }
  }, [settings]);

  return null;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <LiveMetadata />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3347120637586448" crossOrigin="anonymous"></script>
      </head>
      <body className="font-body antialiased">
        <VisitorTracker />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
