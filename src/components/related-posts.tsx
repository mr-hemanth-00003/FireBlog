'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import type { Post } from '@/lib/data';
import { ArticleCard } from '@/components/article-card';

interface RelatedPostsProps {
  currentSlug: string;
  tags: string[];
}

export function RelatedPosts({ currentSlug, tags }: RelatedPostsProps) {
  const [related, setRelated] = useState<Post[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!tags || tags.length === 0) return;
      try {
        const postsRef = collection(db, 'posts');
        // Fetch by first tag; for more coverage, you could iterate tags and merge
        const nowIso = new Date().toISOString();
        const q = query(
          postsRef,
          where('isArchived', '==', false),
          where('publishDate', '<=', nowIso),
          where('tags', 'array-contains', tags[0]),
          orderBy('publishDate', 'desc'),
          limit(6)
        );
        const snap = await getDocs(q);
        const posts = snap.docs
          .map(d => ({ slug: d.id, ...d.data() } as Post))
          .filter(p => p.slug !== currentSlug)
          .slice(0, 3);
        setRelated(posts);
      } catch (e) {
        console.error('Failed to load related posts:', e);
      }
    };
    fetchRelated();
  }, [currentSlug, tags]);

  if (!related.length) return null;

  return (
    <section className="mt-12">
      <h3 className="text-xl font-semibold mb-4">Related Posts</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}


