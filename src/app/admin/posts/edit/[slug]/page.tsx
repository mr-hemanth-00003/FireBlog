
'use client';

import { notFound, useRouter } from 'next/navigation';
import { posts } from '@/lib/data';
import { PostForm } from '@/components/post-form';
import type { Post } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface EditPostPageProps {
  params: { slug: string };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const handleSubmit = async (data: Omit<Post, 'slug' | 'date'>) => {
    // In a real app, you would send this to an API endpoint
    console.log('Updating post:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Post Updated!',
      description: 'Your changes have been saved successfully.',
    });

    router.push('/admin/posts');
  };

  return (
     <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Edit Post</h2>
        </div>
        <PostForm onSubmit={handleSubmit} defaultValues={post} />
    </div>
  );
}
