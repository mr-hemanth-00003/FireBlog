import { MetadataRoute } from 'next';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { SettingsFormValues } from './admin/settings/page';

async function getSiteUrl(): Promise<string> {
    try {
        const settingsDoc = await getDoc(doc(db, 'settings', 'site'));
        if (settingsDoc.exists()) {
            const settings = settingsDoc.data() as SettingsFormValues;
            return settings.siteUrl;
        }
    } catch (error) {
        console.error("Failed to fetch site URL for robots.txt:", error);
    }
    // Fallback to a default or environment variable if settings are not available
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
}
 
export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = await getSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
