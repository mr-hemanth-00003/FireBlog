
"use client";

import { useState, useEffect } from 'react';
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
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, orderBy('date', 'desc'));

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

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

  if (!featuredPost) {
     return (
       <div className="flex flex-col min-h-screen bg-background">
        <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <main className="flex-grow">
          <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 text-center">
              <h2 className="text-2xl font-bold mb-4">No Posts Found</h2>
              <p className="text-muted-foreground">There are no posts available. Check back later!</p>
          </div>
        </main>
        <Footer />
       </div>
     )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Ad Placeholder */}
          <Card className="mb-8 p-4 text-center animate-fade-in">
            <p className="text-sm text-muted-foreground tracking-widest">ADVERTISEMENT</p>
            {/* <!-- Ad Placeholder 1 --> */}
          </Card>

          {/* Featured Post */}
          <section className="mb-12 md:mb-16 animate-fade-in-up animation-delay-200">
            <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="p-8 md:p-12 order-2 md:order-1">
                    <p className="text-primary font-semibold mb-2 font-headline">Featured Article</p>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 font-headline leading-tight">
                      <Link href={`/article/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                        {featuredPost.title}
                      </Link>
                    </h1>
                    <p className="text-muted-foreground md:text-lg mb-6">{featuredPost.excerpt}</p>
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
          
          {/* Latest Posts */}
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
