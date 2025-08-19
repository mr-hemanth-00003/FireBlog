
'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Loader2, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const settingsSchema = z.object({
  siteTitle: z.string().min(3, { message: "Site title must be at least 3 characters." }),
  metaDescription: z.string().min(10, { message: "Meta description must be at least 10 characters." }),
  siteUrl: z.string().url({ message: "Please enter a valid URL." }),
  metaKeywords: z.string().min(3, { message: "Please enter at least one keyword." }),
  social: z.object({
      twitter: z.string().url({ message: "Please enter a valid Twitter URL." }).or(z.literal('')).optional(),
      github: z.string().url({ message: "Please enter a valid GitHub URL." }).or(z.literal('')).optional(),
      linkedin: z.string().url({ message: "Please enter a valid LinkedIn URL." }).or(z.literal('')).optional(),
  }),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;

const defaultSettings: SettingsFormValues = {
    siteTitle: 'FireBlog - A Modern Blog Template',
    metaDescription: 'A clean and modern blog template built with Next.js and Firebase.',
    siteUrl: 'http://localhost:9002',
    metaKeywords: 'blog, nextjs, firebase, web development',
    social: {
        twitter: '#',
        github: '#',
        linkedin: '#'
    }
};

export default function SettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultSettings,
  });

  useEffect(() => {
    const fetchSettings = async () => {
        try {
            const settingsDoc = await getDoc(doc(db, 'settings', 'site'));
            if (settingsDoc.exists()) {
                form.reset(settingsDoc.data() as SettingsFormValues);
            }
        } catch (error) {
            console.error("Error fetching settings: ", error);
            toast({
                title: 'Error',
                description: 'Could not load site settings.',
                variant: 'destructive',
            })
        } finally {
            setLoading(false);
        }
    };
    fetchSettings();
  }, [form, toast]);
  
  const { isSubmitting } = form.formState;

  async function onSubmit(values: SettingsFormValues) {
    try {
        await setDoc(doc(db, 'settings', 'site'), values);
        toast({
            title: "Settings Saved",
            description: "Your changes have been saved successfully.",
        });
    } catch (error) {
        console.error('Error saving settings: ', error);
        toast({
            title: 'Error',
            description: 'Failed to save settings. Please try again.',
            variant: 'destructive',
        });
    }
  }

  if (loading) {
    return (
         <div className="flex-1 space-y-4">
             <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Site Settings</CardTitle>
                    <CardDescription>Manage your blog's general and SEO settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2">
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        <span>Loading settings...</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        </div>
         <Card>
            <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>Manage your blog's general and SEO settings.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
                        <FormField
                            control={form.control}
                            name="siteTitle"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Site Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Blog's Name" {...field} />
                                </FormControl>
                                <FormDescription>This is the title that appears in the browser tab.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="metaDescription"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Meta Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="A short description of your blog for search engines." {...field} />
                                </FormControl>
                                <FormDescription>This description is used by search engines for SEO.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="siteUrl"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Site URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com" {...field} />
                                </FormControl>
                                <FormDescription>The main URL of your live website.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="metaKeywords"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Meta Keywords</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. tech, programming, startups" {...field} />
                                </FormControl>
                                <FormDescription>Comma-separated keywords for search engine optimization.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <h3 className="text-lg font-medium pt-4 border-t">Social Links</h3>
                        
                        <FormField
                          control={form.control}
                          name="social.twitter"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2"><Twitter/> Twitter URL (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="https://twitter.com/username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="social.github"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2"><Github /> GitHub URL (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="https://github.com/username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="social.linkedin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2"><Linkedin /> LinkedIn URL (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="https://linkedin.com/in/username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" disabled={isSubmitting}>
                             {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                             Save Changes
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
