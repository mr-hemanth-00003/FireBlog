'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Settings } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const settingsFormSchema = z.object({
  siteTitle: z.string().min(5, { message: 'Site title must be at least 5 characters.' }),
  siteDescription: z.string().max(160, { message: 'Description cannot exceed 160 characters.' }),
  siteUrl: z.string().url({ message: 'Please enter a valid URL.' }),
  ogImage: z.string().url({ message: 'Please enter a valid URL for the social sharing image.' }),
  googleAnalyticsId: z.string().optional(),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export default function SettingsPage() {
  const { toast } = useToast();
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      siteTitle: 'FireBlog - A Modern Blog Template',
      siteDescription: 'A clean and modern blog template built with Next.js and Firebase.',
      siteUrl: 'https://fireblog.app',
      ogImage: 'https://placehold.co/1200x630.png',
      googleAnalyticsId: 'UA-XXXXX-Y'
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: SettingsFormValues) {
    // In a real application, you would save these settings to your database.
    console.log('Saving settings:', values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Settings Saved!',
      description: 'Your site settings have been successfully updated.',
    });
  }

  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">Manage your site-wide configurations.</p>
      </div>

       <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>General & SEO</CardTitle>
              <CardDescription>Configure the basic SEO settings for your website. This information will appear in search engine results.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="siteTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Awesome Blog" {...field} />
                      </FormControl>
                      <FormDescription>The title that appears in the browser tab and search results.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="siteDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="A short description of your blog." {...field} />
                      </FormControl>
                      <FormDescription>A brief summary for search engines (max 160 characters).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="siteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormDescription>The full canonical URL of your website.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                 <FormField
                  control={form.control}
                  name="ogImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Social Sharing Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/og-image.png" {...field} />
                      </FormControl>
                      <FormDescription>The default image used when sharing links on social media (e.g., 1200x630px).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="pt-2">
                    <h3 className="text-lg font-medium">Analytics</h3>
                    <p className="text-sm text-muted-foreground mt-1">Integrate with third-party analytics services.</p>
                </div>

                 <FormField
                  control={form.control}
                  name="googleAnalyticsId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Google Analytics ID</FormLabel>
                      <FormControl>
                        <Input placeholder="UA-XXXXX-Y" {...field} />
                      </FormControl>
                      <FormDescription>Your Google Analytics Tracking ID to enable site tracking.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isSubmitting}>
                         {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Settings"
                        )}
                    </Button>
                </div>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
