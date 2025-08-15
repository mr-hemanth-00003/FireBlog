
'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, MessageSquare, PlusCircle, Tag, Users } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Post } from '@/lib/data';

// Since this is a client component, we can't export metadata directly.
// We can set the title in the layout or via Head component if needed.

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ slug: doc.id, ...doc.data() } as Post));
      setPosts(postsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  const totalPosts = posts.length;
  // Dummy data for example purposes
  const totalComments = 125;
  const totalTags = 15;
  const totalUsers = 2;


  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
                <Button asChild>
                    <Link href="/admin/posts/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Post
                    </Link>
                </Button>
            </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{loading ? '...' : totalPosts}</div>
                <p className="text-xs text-muted-foreground">articles currently published</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comments</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">+{totalComments}</div>
                <p className="text-xs text-muted-foreground">(dummy data)</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tags</CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{totalTags}</div>
                <p className="text-xs text-muted-foreground">(dummy data)</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{totalUsers}</div>
                <p className="text-xs text-muted-foreground">(dummy data)</p>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="space-y-4">
                    {loading ? <p>Loading posts...</p> : posts.slice(0, 5).map((post) => (
                        <div key={post.slug} className="flex items-center justify-between">
                            <div>
                                <Link href={`/article/${post.slug}`} className="font-medium hover:underline" target="_blank">
                                    {post.title}
                                </Link>
                                <p className="text-sm text-muted-foreground">{post.author.name} &middot; {new Date(post.date).toLocaleDateString()}</p>
                            </div>
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/admin/posts/edit/${post.slug}`}>
                                    Edit
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
