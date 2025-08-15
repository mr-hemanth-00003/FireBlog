
import type { Post } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  post: Post;
}

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0 border-b">
        <Link href={`/article/${post.slug}`} className="block overflow-hidden" aria-label={`Read more about ${post.title}`}>
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover aspect-video transition-transform duration-500 ease-in-out hover:scale-105"
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
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>
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
