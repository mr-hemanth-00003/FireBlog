import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { VisitorTracker } from '@/components/visitor-tracker';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { SettingsFormValues } from './admin/settings/page';


export async function generateMetadata(): Promise<Metadata> {
  try {
    const settingsDoc = await getDoc(doc(db, 'settings', 'site'));
    if (settingsDoc.exists()) {
      const settings = settingsDoc.data() as SettingsFormValues;
      return {
        title: settings.siteTitle,
        description: settings.metaDescription,
        keywords: settings.metaKeywords,
      };
    }
  } catch (error) {
    console.error("Failed to fetch settings for metadata:", error);
  }
  
  return {
    title: 'FireBlog - A Modern Blog Template',
    description: 'A clean and modern blog template built with Next.js and Firebase.',
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
