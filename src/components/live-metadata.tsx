
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import type { Settings } from '@/types/settings';

const defaultSettings: Settings = {
    siteTitle: 'FireBlog - A Modern Blog Template',
    metaDescription: 'A clean and modern blog template built with Next.js and Firebase.',
    siteUrl: 'http://localhost:9002',
    metaKeywords: 'blog, nextjs, firebase, web development',
    social: {
        twitter: '',
        github: '',
        linkedin: ''
    }
};

export function LiveMetadata() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'site'), (doc) => {
      if (doc.exists()) {
        setSettings({ ...defaultSettings, ...(doc.data() as Partial<Settings>) });
      }
    });
    return () => unsub();
  }, []);

  const getPageTitle = () => {
    if (pathname === '/') return settings.siteTitle;
    if (pathname.startsWith('/article/')) return ''; // Article pages handle their own title
    
    // Simple title case for other routes
    const pageName = pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ');
    const formattedPageName = pageName ? pageName.charAt(0).toUpperCase() + pageName.slice(1) : '';
    
    return `${formattedPageName} | ${settings.siteTitle}`;
  }
  
  const pageTitle = getPageTitle();

  return (
    <Head>
      {pageTitle && <title>{pageTitle}</title>}
      <meta name="description" content={settings.metaDescription} />
      <meta name="keywords" content={settings.metaKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${settings.siteUrl}${pathname}`} />
      <meta property="og:title" content={pageTitle || settings.siteTitle} />
      <meta property="og:description" content={settings.metaDescription} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${settings.siteUrl}${pathname}`} />
      <meta property="twitter:title" content={pageTitle || settings.siteTitle} />
      <meta property="twitter:description" content={settings.metaDescription} />
    </Head>
  );
}
