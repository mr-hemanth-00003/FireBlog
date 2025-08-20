
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, FileText, PlusCircle, Tag, Users } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { Post } from '@/lib/data';
import { PostsChart } from '@/components/posts-chart';

// Since this is a client component, we can't export metadata directly.
// We can set the title in the layout or via Head component if needed.

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [teamCount, setTeamCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postsUnsub = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ slug: doc.id, ...doc.data() } as Post));
      setPosts(postsData);
      setLoading(false);
    });
    
    const teamUnsub = onSnapshot(collection(db, 'team'), (snapshot) => {
        setTeamCount(snapshot.size);
    });
    
    const messagesUnsub = onSnapshot(collection(db, 'contacts'), (snapshot) => {
        setMessageCount(snapshot.size);
    });

    const fetchVisitors = async () => {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const visitorsQuery = query(collection(db, 'visitors'), where('timestamp', '>=', twentyFourHoursAgo));
        const visitorsSnapshot = await getDocs(visitorsQuery);
        const uniqueVisitors = new Set(visitorsSnapshot.docs.map(doc => doc.data().visitorId));
        setVisitorCount(uniqueVisitors.size);
    }
    
    // We can fetch visitors once and then poll or listen for real-time updates if needed.
    // For simplicity, we'll fetch on load and then maybe on an interval if required.
    fetchVisitors();
    const visitorInterval = setInterval(fetchVisitors, 60000); // Refresh every minute


    return () => {
        postsUnsub();
        teamUnsub();
        messagesUnsub();
        clearInterval(visitorInterval);
    };
  }, []);
  
  const totalPosts = posts.length;
  const allTags = posts.flatMap(post => post.tags);
  const uniqueTags = new Set(allTags);
  const totalTags = uniqueTags.size;


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
            <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{loading ? '...' : totalPosts}</div>
                <p className="text-xs text-muted-foreground">articles currently published</p>
                </CardContent>
            </Card>
            <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visitors (24h)</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{loading ? '...' : visitorCount}</div>
                <p className="text-xs text-muted-foreground">unique visitors in last 24h</p>
                </CardContent>
            </Card>
            <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tags</CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{loading ? '...' : totalTags}</div>
                <p className="text-xs text-muted-foreground">unique tags used</p>
                </CardContent>
            </Card>
             <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{loading ? '...' : teamCount}</div>
                <p className="text-xs text-muted-foreground">members on the about page</p>
                </CardContent>
            </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-12 lg:col-span-4">
                 {loading ? <Card className="glass-card"><CardContent className="pt-6">Loading chart...</CardContent></Card> : <PostsChart posts={posts} />}
            </div>
            <Card className="col-span-12 lg:col-span-3 glass-card">
                <CardHeader>
                     <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div>
                             <h3 className="text-sm font-medium text-muted-foreground mb-2">Recent Posts</h3>
                             {loading ? <p>Loading posts...</p> : posts.slice(0, 3).map((post) => (
                                <div key={post.slug} className="flex items-center justify-between mb-2">
                                    <div>
                                        <Link href={`/article/${post.slug}`} className="font-medium hover:underline text-sm" target="_blank">
                                            {post.title}
                                        </Link>
                                        <p className="text-xs text-muted-foreground">{post.author.name}</p>
                                    </div>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/admin/posts/edit/${post.slug}`}>
                                            Edit
                                        </Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <div>
                             <h3 className="text-sm font-medium text-muted-foreground mb-2">Recent Messages</h3>
                              <div className="text-2xl font-bold">+{loading ? '...' : messageCount}</div>
                              <p className="text-xs text-muted-foreground">new messages this month</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
