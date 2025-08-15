'use client';

import { notFound, useRouter } from 'next/navigation';
import { PostForm } from '@/components/post-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { posts, Post } from '@/lib/data';
import { useToast } from "@/hooks/use-toast";


export default function EditPostPage({ params }: { params: { slug: string } }) {
    const { toast } = useToast();
    const router = useRouter();

    const post = posts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    const handleEditPost = async (data: Omit<Post, 'slug' | 'date'>) => {
        // In a real application, you would send this data to your server/API to update the post.
        // For this demo, we'll simulate it and show a success message.
        console.log(`Updating post ${params.slug} with data:`, data);
        
        toast({
            title: "Post Updated!",
            description: "Your blog post has been successfully updated.",
        });

        // Redirect to the posts list after editing
        router.push('/admin/posts');
    };
    
    return (
         <Card>
            <CardHeader>
                <CardTitle>Edit Post</CardTitle>
                <CardDescription>You are currently editing: "{post.title}"</CardDescription>
            </CardHeader>
            <CardContent>
                <PostForm onSubmit={handleEditPost} defaultValues={post} />
            </CardContent>
        </Card>
    );
}