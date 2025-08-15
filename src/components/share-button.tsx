
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Share2, Copy } from 'lucide-react';
import type { Post } from '@/lib/data';

interface ShareButtonProps {
  post: Post;
}

export function ShareButton({ post }: ShareButtonProps) {
  const { toast } = useToast();
  const [hasShared, setHasShared] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: `${window.location.origin}/article/${post.slug}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setHasShared(true);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: 'Link Copied!',
          description: 'Article link copied to your clipboard.',
        });
      } catch (err) {
        console.error('Failed to copy text: ', err);
         toast({
          title: 'Error',
          description: 'Could not copy link to clipboard.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <Button onClick={handleShare} variant="outline">
      <Share2 className="mr-2 h-4 w-4" />
      Share
    </Button>
  );
}
