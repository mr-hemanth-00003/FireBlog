import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { posts } from '@/lib/data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | FireBlog`,
    description: post.excerpt,
  };
}

export default function ArticlePage({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <article>
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <header className="mb-8 md:mb-12 text-center">
              <h1 className="text-3xl md:text-5xl font-bold font-headline leading-tight mb-4">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{post.author.name}</span>
                </div>
                <span>&middot;</span>
                <time dateTime={post.date}>{post.date}</time>
              </div>
            </header>
            
            <Card className="overflow-hidden mb-8 md:mb-12 shadow-lg">
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

            <div
              className="prose-styles"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* <!-- Ad Placeholder 3 --> */}
            <Card className="my-8 md:my-12 p-4 text-center">
                <p className="text-sm text-muted-foreground tracking-widest">ADVERTISEMENT</p>
            </Card>

            <footer className="mt-12 pt-8 border-t">
              <p className="font-semibold mb-3">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1">{tag}</Badge>
                ))}
              </div>
            </footer>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
