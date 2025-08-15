
'use client';

import { useState, useEffect, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { PostForm } from '@/components/post-form';
import type { Post } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

interface EditPostPageProps {
  params: Promise<{ slug: string }>;
}

function EditPostForm({ slug }: { slug: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, 'posts', slug));
        if (postDoc.exists()) {
          setPost({ slug: postDoc.id, ...postDoc.data() } as Post);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const handleSubmit = async (data: Omit<Post, 'slug'>) => {
    try {
      const postRef = doc(db, 'posts', slug);
      const updatedData = { ...data };
      await updateDoc(postRef, updatedData);
      
      toast({
        title: 'Post Updated!',
        description: 'Your changes have been saved successfully.',
      });

      router.push(updatedData.isArchived ? '/admin/posts/archived' : '/admin/posts');
    } catch (error) {
      console.error("Error updating document: ", error);
      toast({
        title: 'Error',
        description: 'Failed to update post. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  return (
     <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Edit Post</h2>
        </div>
        <PostForm onSubmit={handleSubmit} defaultValues={post} />
    </div>
  );
}


export default function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = use(params);
  return <EditPostForm slug={slug} />;
}
