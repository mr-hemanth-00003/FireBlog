
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal, Archive, Trash2, Clock } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, where, orderBy } from 'firebase/firestore';
import type { Post } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, where('isArchived', '==', false), orderBy('publishDate', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ slug: doc.id, ...doc.data() } as Post));
      setPosts(postsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDeleteClick = (slug: string) => {
    setDeleting(slug);
    setIsAlertOpen(true);
  };

  const handleArchiveClick = async (slug: string) => {
    try {
      const postRef = doc(db, 'posts', slug);
      await updateDoc(postRef, { isArchived: true });
      toast({
        title: 'Post Archived',
        description: 'The post has been moved to the archive.',
      });
    } catch (error) {
       toast({
        title: 'Error',
        description: 'Failed to archive the post. Please try again.',
        variant: 'destructive',
      });
      console.error("Error archiving document: ", error);
    }
  }

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await deleteDoc(doc(db, 'posts', deleting));
      toast({
        title: 'Post Deleted',
        description: 'The post has been successfully deleted.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete the post. Please try again.',
        variant: 'destructive',
      });
      console.error("Error removing document: ", error);
    } finally {
      setIsAlertOpen(false);
      setDeleting(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Published Posts</CardTitle>
              <CardDescription>Manage your published and scheduled articles.</CardDescription>
            </div>
            <Button asChild>
              <Link href="/admin/posts/new">Create Post</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Image
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="hidden md:table-cell">Publish Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Loading posts...</TableCell>
                </TableRow>
              ) : posts.length > 0 ? (
                posts.map((post) => {
                  const isScheduled = new Date(post.publishDate) > new Date();
                  return (
                    <TableRow key={post.slug}>
                    <TableCell className="hidden sm:table-cell">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                        alt={post.title}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={post.imageUrl}
                        width="64"
                        data-ai-hint={post.imageHint}
                        />
                    </TableCell>
                    <TableCell className="font-medium">
                        {post.title}
                        {isScheduled && (
                            <Badge variant="outline" className="ml-2">
                                <Clock className="mr-1 h-3 w-3" />
                                Scheduled
                            </Badge>
                        )}
                    </TableCell>
                    <TableCell>{post.author.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{new Date(post.publishDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                            <Link href={`/admin/posts/edit/${post.slug}`}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleArchiveClick(post.slug)}>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteClick(post.slug)} className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                    <TableCell colSpan={5} className="text-center">No published posts found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the post
              from your database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
