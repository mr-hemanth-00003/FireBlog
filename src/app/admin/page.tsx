import Link from 'next/link';
import { posts } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Newspaper, Users, PenSquare, Sparkles } from 'lucide-react';
import { AnalyticsChart } from './analytics/chart';

export default function AdminDashboard() {
    const totalPosts = posts.length;
    const authors = new Set(posts.map(p => p.author.name)).size;
    
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">An overview of your blog's performance and content.</p>
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
         <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Create Post</CardTitle>
            <PenSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <Button asChild size="sm" className="mt-2">
                  <Link href="/admin/posts/create">Write a New Article</Link>
              </Button>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Tools</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" size="sm" className="mt-2">
                <Link href="/admin/tag-suggester">Suggest Tags</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Post Analytics</CardTitle>
          <CardDescription>A chart showing post creation over time (example data).</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
           <AnalyticsChart />
        </CardContent>
      </Card>
       <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Jump to common actions or view your live site.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
              <Button asChild>
                  <Link href="/admin/posts">Manage Posts</Link>
              </Button>
               <Button asChild variant="outline">
                  <Link href="/admin/settings">Site Settings</Link>
              </Button>
               <Button asChild variant="ghost">
                  <Link href="/" target="_blank">View Live Site <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
              </Button>
          </CardContent>
        </Card>
    </div>
  );
}
