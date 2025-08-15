
import { MetadataRoute } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { Post } from '@/lib/data';

const SITE_URL = 'https://fireblog-vg986.web.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const staticRoutes = ['/', '/about', '/contact'].map((route) => ({
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

  return [...staticRoutes, ...postRoutes];
}
