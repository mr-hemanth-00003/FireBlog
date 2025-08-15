
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';
import { suggestArticleTags, SuggestArticleTagsInput } from '@/ai/flows/suggest-article-tags';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  articleText: z.string().min(50, { message: "Article text must be at least 50 characters." }),
});

export default function TagSuggesterPage() {
  const { toast } = useToast();
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { articleText: "" },
  });
  
  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSuggestedTags([]);
    try {
      const { tags } = await suggestArticleTags({ articleText: values.articleText });
      setSuggestedTags(tags);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to suggest tags. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">AI Tag Suggester</h2>
        </div>
         <Card>
            <CardHeader>
                <CardTitle>Generate SEO-Friendly Tags</CardTitle>
                <CardDescription>Paste your article content below and let AI suggest relevant tags.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="articleText"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Article Content</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Paste your full article text here..." {...field} className="min-h-[250px]" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isSubmitting}>
                             {isSubmitting ? (
                                <>
                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                 Analyzing...
                                </>
                             ) : (
                                <>
                                 <Wand2 className="mr-2 h-4 w-4" />
                                 Suggest Tags
                                </>
                             )}
                        </Button>
                    </form>
                </Form>
                {suggestedTags.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-3">Suggested Tags:</h3>
                        <div className="flex flex-wrap gap-2">
                           {suggestedTags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-base px-3 py-1">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
