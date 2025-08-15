
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
import { Loader2 } from 'lucide-react';

const settingsSchema = z.object({
  siteTitle: z.string().min(3, { message: "Site title must be at least 3 characters." }),
  metaDescription: z.string().min(10, { message: "Meta description must be at least 10 characters." }),
  siteUrl: z.string().url({ message: "Please enter a valid URL." }),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { toast } = useToast();
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
        siteTitle: 'FireBlog - A Modern Blog Template',
        metaDescription: 'A clean and modern blog template built with Next.js and Firebase.',
        siteUrl: 'http://localhost:9002'
    }
  });
  
  const { isSubmitting } = form.formState;

  async function onSubmit(values: SettingsFormValues) {
    console.log('Saving settings:', values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Settings Saved",
      description: "Your changes have been saved successfully.",
    });
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
