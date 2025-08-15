"use client";

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArticleCard } from '@/components/article-card';
import { posts, Post } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Home() {
  const featuredPost = posts[0];
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const otherPosts = posts.slice(1);
  const filteredPosts = otherPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Ad Placeholder */}
          <Card className="mb-8 p-4 text-center">
            <p className="text-sm text-muted-foreground tracking-widest">ADVERTISEMENT</p>
            {/* <!-- Ad Placeholder 1 --> */}
          </Card>

          {/* Featured Post */}
          <section className="mb-12 md:mb-16">
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
                     <ArticleCard post={featuredPost} />
                  </div>
                </div>
            </Card>
          </section>
          
          {/* Latest Posts */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 font-headline text-center">Latest Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
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
