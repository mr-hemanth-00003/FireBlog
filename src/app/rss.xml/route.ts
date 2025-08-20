
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { Post } from '@/lib/data';
import type { Settings } from '@/types/settings';
import RSS from 'rss';

async function getSettings(): Promise<Settings | null> {
    try {
        const settingsDoc = await getDoc(doc(db, 'settings', 'site'));
        if (settingsDoc.exists()) {
            return settingsDoc.data() as Settings;
        }
    } catch (error) {
        console.error("Failed to fetch settings for RSS feed:", error);
    }
    return null;
}

export async function GET() {
  const settings = await getSettings();
  
  if (!settings) {
    return new Response('Site settings not found', { status: 500 });
  }

  const feed = new RSS({
    title: settings.siteTitle,
    description: settings.metaDescription,
    feed_url: `${settings.siteUrl}/rss.xml`,
    site_url: settings.siteUrl,
    managingEditor: 'Admin',
    webMaster: 'Admin',
    copyright: `${new Date().getFullYear()} ${settings.siteTitle}`,
    language: 'en',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const postsCollection = collection(db, 'posts');
  const now = new Date().toISOString();
  const q = query(
    postsCollection,
    where('isArchived', '==', false),
    where('publishDate', '<=', now),
    orderBy('publishDate', 'desc')
  );
  
  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map(doc => ({ slug: doc.id, ...doc.data() } as Post));

  posts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${settings.siteUrl}/article/${post.slug}`,
      guid: post.slug,
      author: post.author.name,
      date: post.publishDate,
      enclosure: {
        url: post.imageUrl,
        type: 'image/jpeg', // Assuming jpeg, adjust if other types are used
      },
      categories: post.tags,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
