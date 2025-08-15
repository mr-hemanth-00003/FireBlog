
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
import { MoreHorizontal, ArchiveRestore, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, where } from 'firebase/firestore';
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
} from "@/components/ui/alert-dialog"

export default function ArchivedPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, where('isArchived', '==', true));
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
  
  const handleUnarchiveClick = async (slug: string) => {
    try {
      const postRef = doc(db, 'posts', slug);
      await updateDoc(postRef, { isArchived: false });
      toast({
        title: 'Post Unarchived',
        description: 'The post has been moved back to published.',
      });
    } catch (error) {
       toast({
        title: 'Error',
        description: 'Failed to unarchive the post. Please try again.',
        variant: 'destructive',
      });
      console.error("Error unarchiving document: ", error);
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
          <CardTitle>Archived Posts</CardTitle>
          <CardDescription>Manage your archived articles.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="hidden md:table-cell">Date Archived</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">Loading archived posts...</TableCell>
                </TableRow>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                    <TableRow key={post.slug}>
                    <TableCell className="font-medium">{post.title}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleUnarchiveClick(post.slug)}>
                                <ArchiveRestore className="mr-2 h-4 w-4" />
                                Unarchive
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteClick(post.slug)} className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Permanently
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
              ))
              ) : (
                <TableRow>
                    <TableCell colSpan={4} className="text-center">No archived posts found.</TableCell>
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
