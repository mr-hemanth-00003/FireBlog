import Link from 'next/link';
import { posts } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Newspaper, Users } from 'lucide-react';

export default function AdminDashboard() {
    const totalPosts = posts.length;
    const authors = new Set(posts.map(p => p.author.name)).size;
    
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">An overview of your blog's performance.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-muted-foreground">articles currently on the blog</p>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Authors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{authors}</div>
            <p className="text-xs text-muted-foreground">unique authors contributing</p>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2 transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Jump to common actions.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                  <Link href="/admin/posts/create">Create New Post</Link>
              </Button>
              <Button asChild variant="outline">
                  <Link href="/admin/tag-suggester">Use AI Tagger</Link>
              </Button>
               <Button asChild variant="ghost">
                  <Link href="/" target="_blank">View Live Site <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
              </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
