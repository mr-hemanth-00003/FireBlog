
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArticleCard } from '@/components/article-card';
import { Post } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    const postsCollection = collection(db, 'posts');
    const now = new Date().toISOString();
    const q = query(postsCollection, where('isArchived', '==', false), where('publishDate', '<=', now), orderBy('publishDate', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ slug: doc.id, ...doc.data() } as Post));
      setPosts(postsData);
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
  
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    )
  }

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

          {/* Ad Placeholder */}
          <Card className="mb-8 p-4 text-center animate-fade-in">
            <p className="text-sm text-muted-foreground tracking-widest">ADVERTISEMENT</p>
            {/* <!-- Ad Placeholder 1 --> */}
          </Card>

          {posts.length === 0 && !loading && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">No Posts Found</h2>
              <p className="text-muted-foreground">There are no posts available. Check back later!</p>
            </div>
          )}

          {/* Featured Post */}
          {featuredPost && (
            <section className="mb-12 md:mb-16 animate-fade-in-up animation-delay-200">
              <Card className="overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0 items-center">
                    <div className="p-8 md:p-12 order-2 md:order-1">
                      <p className="text-primary font-semibold mb-2 font-headline">Featured Article</p>
                      <h1 className="text-3xl md:text-4xl font-bold mb-4 font-headline leading-tight">
                        <Link href={`/article/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                          {featuredPost.title}
                        </Link>
                      </h1>
                      <div className="mb-6">
                        <p className="text-muted-foreground md:text-lg">{featuredPost.excerpt}</p>
                      </div>
                       <Button asChild size="lg">
                        <Link href={`/article/${featuredPost.slug}`}>Read Full Story</Link>
                      </Button>
                    </div>
                    <div className="order-1 md:order-2">
                       <ArticleCard post={featuredPost} hideContent={true} />
                    </div>
                  </div>
              </Card>
            </section>
          )}
          
          {/* Latest Posts */}
          {otherPosts.length > 0 && (
            <section className="animate-fade-in-up animation-delay-400">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 font-headline text-center">Latest Posts</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherPosts.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
                 {/* Ad Placeholder 2 - In Grid */}
                <Card className="hidden lg:flex flex-col items-center justify-center p-4">
                    <p className="text-sm text-muted-foreground tracking-widest">ADVERTISEMENT</p>
                    {/* <!-- Ad Placeholder 2 --> */}
                </Card>
              </div>
            </section>
          )}

            {/* Ad Placeholder 2 mobile */}
           <Card className="mt-8 p-4 text-center lg:hidden">
            <p className="text-sm text-muted-foreground tracking-widest">ADVERTISEMENT</p>
            {/* <!-- Ad Placeholder 2 --> */}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
