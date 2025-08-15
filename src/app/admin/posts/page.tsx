'use client';

import Link from 'next/link';
import { posts, Post } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PenSquare, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

// This would typically be a server action or API call
async function deletePostAction(slug: string) {
  // In a real app, you'd call an API to delete the post from the database.
  // For this demo, we'll just log it.
  console.log(`Deleting post with slug: ${slug}`);
  return { success: true };
}


export default function AdminPostsPage() {
    const [allPosts, setAllPosts] = useState<Post[]>(posts);

    const handleDelete = async (slug: string) => {
        if (confirm('Are you sure you want to delete this post?')) {
            const result = await deletePostAction(slug);
            if (result.success) {
                // In a real app with a DB, you would re-fetch the posts.
                // For this demo, we filter the state.
                setAllPosts(allPosts.filter(p => p.slug !== slug));
                // Optionally, show a toast notification for success
            } else {
                // Optionally, show a toast notification for error
            }
        }
    };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Blog Posts</CardTitle>
                <CardDescription>Manage your articles here.</CardDescription>
            </div>
            <Button asChild>
                <Link href="/admin/posts/create">
                <PlusCircle className="mr-2" />
                Create New Post
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Author</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allPosts.map((post) => (
              <TableRow key={post.slug}>
                <TableCell className="font-medium">
                  <Link href={`/article/${post.slug}`} className="hover:underline" target="_blank">
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell">{post.author.name}</TableCell>
                <TableCell className="hidden lg:table-cell">{post.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="icon">
                      <Link href={`/admin/posts/edit/${post.slug}`}>
                        <PenSquare className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(post.slug)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}