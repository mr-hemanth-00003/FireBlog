
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArticleCard } from '@/components/article-card';
import { Post } from '@/lib/data';
import { Loader2, Search } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(q);

  useEffect(() => {
    setSearchQuery(q);
  }, [q]);
  
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

  const triggerSearch = () => {
    if (searchQuery.trim() !== '') {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }

  const handleSearchSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        triggerSearch();
    }
  };

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
            <section className="mb-8">
              <div className="flex w-full items-center space-x-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search for articles..."
                    className="w-full pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                  />
                </div>
                <Button type="submit" onClick={triggerSearch} aria-label="Search">
                  <Search className="h-5 w-5" />
                  <span className="hidden md:inline-block ml-2">Search</span>
                </Button>
              </div>
            </section>
            
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
