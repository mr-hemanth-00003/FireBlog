
import type { Post } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface ArticleCardProps {
  post: Post;
  hideContent?: boolean;
}

export function ArticleCard({ post, hideContent = false }: ArticleCardProps) {
  if (hideContent) {
     return (
        <div className="relative overflow-hidden rounded-lg">
         <Link href={`/article/${post.slug}`} className="block overflow-hidden" aria-label={`Read more about ${post.title}`}>
            <Image
                src={post.imageUrl}
                alt={post.title}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                data-ai-hint={post.imageHint}
            />
         </Link>
        </div>
     )
  }

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in glass-card">
      <CardHeader className="p-0 border-b">
        <Link href={`/article/${post.slug}`} className="block overflow-hidden" aria-label={`Read more about ${post.title}`}>
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            data-ai-hint={post.imageHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl leading-snug mb-2 font-headline">
          <Link href={`/article/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs text-muted-foreground">{format(new Date(post.publishDate), "PP")}</p>
          </div>
        </div>
        <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary">
          <Link href={`/article/${post.slug}`}>
            Read More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
