
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArticleCard } from '@/components/article-card';
import { Post } from '@/lib/data';
import { Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postsCollection = collection(db, 'posts');
    const postsQuery = query(postsCollection, orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ slug: doc.id, ...doc.data() } as Post));
      setAllPosts(postsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching posts: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredPosts = allPosts.filter(post =>
    post.title.toLowerCase().includes(q.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(q.toLowerCase()) ||
    post.content.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">
                Search Results for &quot;<span className="text-primary">{q}</span>&quot;
            </h1>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            ) : filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                        <ArticleCard key={post.slug} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
                    <p className="text-muted-foreground">
                        Your search for &quot;{q}&quot; did not return any results. Please try a different query.
                    </p>
                </div>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    )
}
