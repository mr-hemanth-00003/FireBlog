
"use client";

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { Post } from '@/lib/data';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ShareButton } from '@/components/share-button';
import { format } from 'date-fns';
import type { Settings } from '@/types/settings';
import { ReadingProgress } from '@/components/reading-progress';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { RelatedPosts } from '@/components/related-posts';
import { useParams, useRouter } from 'next/navigation';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postSnap = await getDoc(doc(db, 'posts', slug));
        if (postSnap.exists()) {
          const data = { slug: postSnap.id, ...postSnap.data() } as Post;
          const isPublished = new Date(data.publishDate) <= new Date();
          if (data.isArchived || !isPublished) {
            router.replace('/');
            return;
          }
          setPost(data);
        } else {
          router.replace('/');
          return;
        }
        const settingsSnap = await getDoc(doc(db, 'settings', 'site'));
        if (settingsSnap.exists()) setSettings(settingsSnap.data() as Settings);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, router]);

  const jsonLd = useMemo(() => {
    if (!post) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${settings?.siteUrl || ''}/article/${post.slug}`,
      },
      headline: post.title,
      description: post.excerpt,
      image: post.imageUrl,
      author: {
        '@type': 'Person',
        name: post.author.name,
        url: settings?.siteUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: settings?.siteTitle || 'FireBlog',
        logo: {
          '@type': 'ImageObject',
          url: `${settings?.siteUrl || ''}/favicon.ico`,
        },
      },
      datePublished: post.publishDate,
      dateModified: post.lastModifiedBy ? new Date().toISOString() : post.publishDate,
    };
  }, [post, settings]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ReadingProgress />
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <Header />
      <main id="main" className="flex-grow py-8 md:py-12">
        <article className="animate-fade-in-up">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="mb-8">
              <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Article' }, { label: post?.title || '' }]} />
              <Button asChild variant="ghost" className="pl-0 text-muted-foreground hover:text-primary">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to All Posts
                </Link>
              </Button>
            </div>

            {loading && (
              <>
                <div className="h-8 w-3/4 bg-secondary/40 rounded animate-pulse mb-4" />
                <div className="h-4 w-1/3 bg-secondary/40 rounded animate-pulse mb-8" />
                <div className="h-64 w-full bg-secondary/30 rounded-xl animate-pulse mb-8" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-secondary/30 rounded animate-pulse" />
                  <div className="h-4 w-11/12 bg-secondary/30 rounded animate-pulse" />
                  <div className="h-4 w-10/12 bg-secondary/30 rounded animate-pulse" />
                </div>
              </>
            )}

            {post && (
              <>
                <header className="mb-8 md:mb-12 text-center animate-fade-in">
                  <h1 className="text-3xl md:text-5xl font-bold font-headline leading-tight mb-4">
                    {post.title}
                  </h1>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{post.author.name}</span>
                    </div>
                    <span>&middot;</span>
                    <time dateTime={post.publishDate}>{format(new Date(post.publishDate), 'PPp')}</time>
                  </div>
                </header>

                <Card className="overflow-hidden mb-8 md:mb-12 shadow-lg animate-fade-in-up animation-delay-200 glass-card">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={1200}
                    height={600}
                    className="w-full"
                    priority
                    data-ai-hint={post.imageHint}
                  />
                </Card>

                <div className="prose dark:prose-invert lg:prose-xl max-w-none animate-fade-in-up animation-delay-400">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
                </div>

                <Card className="my-8 md:my-12 p-4 text-center animate-fade-in animation-delay-400">
                  <p className="text-sm text-muted-foreground tracking-widest">ADVERTISEMENT</p>
                </Card>

                <RelatedPosts currentSlug={post.slug} tags={post.tags} />

                <footer className="mt-12 pt-8 border-t animate-fade-in-up animation-delay-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold mb-3">Tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                            <Badge variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-primary/20 transition-all">
                              {tag}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </footer>
              </>
            )}
          </div>
        </article>
      </main>
      {post && <ShareButton post={post} />}
      <Footer />
    </div>
  );
}

// metadata handled by root layout; no server exports here (client component)
