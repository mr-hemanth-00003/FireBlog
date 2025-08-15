
'use client';

import { useRouter } from 'next/navigation';
import { PostForm } from '@/components/post-form';
import type { Post } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function NewPostPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: Omit<Post, 'slug' | 'date'>) => {
    // In a real app, you would send this to an API endpoint
    console.log('Creating new post:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Post Created!',
      description: 'Your new post has been published successfully.',
    });

    router.push('/admin/posts');
  };

  return (
     <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Create New Post</h2>
        </div>
        <PostForm onSubmit={handleSubmit} />
    </div>
  );
}
