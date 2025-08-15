
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Post } from '@/lib/data';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2 } from 'lucide-react';
import { ShareButton } from '@/components/share-button';

type Props = {
  params: { slug: string };
};

// Helper function to fetch a single post
async function getPost(slug: string): Promise<Post | null> {
  const docRef = doc(db, "posts", slug);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const postData = { slug: docSnap.id, ...docSnap.data() } as Post;
    // Don't show archived posts on public site
    if (postData.isArchived) return null;
    return postData;
  } else {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

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

export default async function ArticlePage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <article className="animate-fade-in-up">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="mb-8">
                <Button asChild variant="ghost" className="pl-0 text-muted-foreground hover:text-primary">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to All Posts
                    </Link>
                </Button>
            </div>
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
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
              </div>
            </header>
            
            <Card className="overflow-hidden mb-8 md:mb-12 shadow-lg animate-fade-in-up animation-delay-200">
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
              className="prose dark:prose-invert lg:prose-xl max-w-none animate-fade-in-up animation-delay-400"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* <!-- Ad Placeholder 3 --> */}
            <Card className="my-8 md:my-12 p-4 text-center animate-fade-in">
                <p className="text-sm text-muted-foreground tracking-widest">ADVERTISEMENT</p>
            </Card>

            <footer className="mt-12 pt-8 border-t animate-fade-in-up animation-delay-600">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold mb-3">Tags:</p>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-primary/20 transition-all">
                                {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
          </div>
        </article>
      </main>
      <ShareButton post={post} />
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const postsCol = collection(db, 'posts');
    const q = query(postsCol, where('isArchived', '==', false));
    const postSnapshot = await getDocs(q);
    const posts = postSnapshot.docs.map(doc => ({ slug: doc.id }));
    return posts;
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}
