
import { MetadataRoute } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, doc, getDoc } from 'firebase/firestore';
import { Post } from '@/lib/data';
import type { Settings } from '@/types/settings';


async function getSiteUrl(): Promise<string> {
    try {
        const settingsDoc = await getDoc(doc(db, 'settings', 'site'));
        if (settingsDoc.exists()) {
            const settings = settingsDoc.data() as Settings;
            return settings.siteUrl;
        }
    } catch (error) {
        console.error("Failed to fetch site URL for sitemap:", error);
    }
    return 'http://localhost:9002';
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = await getSiteUrl();

  const staticRoutes = ['/', '/about', '/contact', '/privacy-policy', '/terms-of-service'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const postsCollection = collection(db, 'posts');
  const now = new Date().toISOString();
  const q = query(postsCollection, where('isArchived', '==', false), where('publishDate', '<=', now), orderBy('publishDate', 'desc'));
  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map(doc => doc.data() as Post);

  const postRoutes = posts.map(post => ({
    url: `${SITE_URL}/article/${post.slug}`,
    lastModified: new Date(post.publishDate).toISOString(),
  }));

  const tagSet = new Set<string>();
  posts.forEach(p => p.tags.forEach(t => tagSet.add(t)));
  const tagRoutes = Array.from(tagSet).map(tag => ({
    url: `${SITE_URL}/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date().toISOString(),
  }));

  return [...staticRoutes, ...postRoutes, ...tagRoutes];
}
