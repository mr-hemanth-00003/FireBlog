
'use client';

import { useRouter } from 'next/navigation';
import { PostForm } from '@/components/post-form';
import type { Post } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

export default function NewPostPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: Omit<Post, 'slug'>) => {
    try {
      // Create a slug from the title
      const slug = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      
      const newPostData = {
        ...data,
        slug,
        isArchived: data.isArchived || false,
      };

      // Add a new document with a generated id.
      await setDoc(doc(db, 'posts', slug), newPostData);
      
      console.log('Creating new post:', newPostData);
      
      toast({
        title: 'Post Created!',
        description: 'Your new post has been published successfully.',
      });

      router.push('/admin/posts');
    } catch (error) {
        console.error("Error adding document: ", error);
        toast({
          title: 'Error',
          description: 'Failed to create post. Please try again.',
          variant: 'destructive',
        });
    }
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
