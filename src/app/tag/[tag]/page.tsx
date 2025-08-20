"use client";

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArticleCard } from '@/components/article-card';
import type { Post } from '@/lib/data';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

export default function TagPage() {
  const { tag } = useParams<{ tag: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchByTag = async () => {
      try {
        const postsCol = collection(db, 'posts');
        const now = new Date().toISOString();
        const q = query(postsCol, where('isArchived', '==', false), where('publishDate', '<=', now), where('tags', 'array-contains', decodeURIComponent(tag)), orderBy('publishDate', 'desc'));
        const snap = await getDocs(q);
        setPosts(snap.docs.map(d => ({ slug: d.id, ...d.data() } as Post)));
      } finally {
        setLoading(false);
      }
    }
    fetchByTag();
  }, [tag]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main id="main" className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold font-headline mb-6">Posts tagged "{decodeURIComponent(tag)}"</h1>
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-72 rounded-xl bg-secondary/30 animate-pulse" />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(p => (
                <ArticleCard key={p.slug} post={p} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No posts found for this tag.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}


