'use client';

import { PostForm } from '@/components/post-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/lib/data';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
    const { toast } = useToast();
    const router = useRouter();

    const handleCreatePost = async (data: Omit<Post, 'slug' | 'date'>) => {
        // In a real application, you would send this data to your server/API to create a new post.
        // For this demo, we'll simulate it and show a success message.
        console.log("Creating post with data:", data);
        
        toast({
            title: "Post Created!",
            description: "Your new blog post has been successfully created.",
        });

        // Redirect to the posts list after creation
        router.push('/admin/posts');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create a New Post</CardTitle>
                <CardDescription>Fill out the form below to publish a new article.</CardDescription>
            </CardHeader>
            <CardContent>
                <PostForm onSubmit={handleCreatePost} />
            </CardContent>
        </Card>
    );
}