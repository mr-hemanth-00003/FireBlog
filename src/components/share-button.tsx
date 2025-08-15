
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Share2 } from 'lucide-react';
import type { Post } from '@/lib/data';

interface ShareButtonProps {
  post: Post;
}

export function ShareButton({ post }: ShareButtonProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: `${window.location.origin}/article/${post.slug}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
        // User cancelled share, no need to show an error
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
    <div className="fixed bottom-8 right-8 z-50">
        <Button 
            onClick={handleShare} 
            size="icon"
            className="w-14 h-14 rounded-full shadow-lg"
        >
        <Share2 className="h-6 w-6" />
        <span className="sr-only">Share Post</span>
        </Button>
    </div>
  );
}
