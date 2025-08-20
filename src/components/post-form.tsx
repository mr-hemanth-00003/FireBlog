
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Post } from '@/lib/data';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Switch } from './ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters long.' }),
  excerpt: z.string().min(10, { message: 'Excerpt must be at least 10 characters long.' }),
  content: z.string().min(50, { message: 'Content must be at least 50 characters long.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
  imageHint: z.string().max(20, { message: "Hint can't be more than two words."}),
  author: z.object({
    name: z.string().min(2, { message: "Author's name is required." }),
    avatarUrl: z.string().url({ message: 'Please enter a valid avatar URL.' }),
  }),
  tags: z.string().min(1, { message: 'Please enter at least one tag.' }),
  isArchived: z.boolean().default(false),
  publishDate: z.date(),
});

interface PostFormProps {
  onSubmit: (data: Omit<Post, 'slug'>) => Promise<void>;
  defaultValues?: Post;
}

export function PostForm({ onSubmit, defaultValues }: PostFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      excerpt: defaultValues?.excerpt || '',
      content: defaultValues?.content || '',
      imageUrl: defaultValues?.imageUrl || '',
      imageHint: defaultValues?.imageHint || '',
      author: {
        name: defaultValues?.author?.name || 'Admin',
        avatarUrl: defaultValues?.author?.avatarUrl || 'https://placehold.co/40x40.png',
      },
      tags: defaultValues?.tags?.join(', ') || '',
      isArchived: defaultValues?.isArchived || false,
      publishDate: defaultValues?.publishDate ? new Date(defaultValues.publishDate) : new Date(),
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const postData = {
      ...values,
      publishDate: values.publishDate.toISOString(),
      tags: values.tags.split(',').map(tag => tag.trim()),
    };
    onSubmit(postData);
  };

  const publishDateValue = form.watch('publishDate');

  const handleTimeChange = (type: 'hours' | 'minutes', value: string) => {
    const date = new Date(publishDateValue);
    const numericValue = parseInt(value, 10);
    if (type === 'hours') {
        date.setHours(numericValue);
    } else {
        date.setMinutes(numericValue);
    }
    form.setValue('publishDate', date, { shouldDirty: true });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a catchy title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="isArchived"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <FormLabel className="text-base">Post Status</FormLabel>
                    <FormDescription>
                        Published posts are visible on the site. Archived posts are hidden.
                    </FormDescription>
                </div>
                <FormControl>
                    <div className="flex items-center space-x-2">
                         <span className={field.value ? 'text-muted-foreground' : ''}>Published</span>
                         <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <span className={field.value ? '' : 'text-muted-foreground'}>Archived</span>
                    </div>
                </FormControl>
                </FormItem>
            )}
        />
         <FormField
          control={form.control}
          name="publishDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Publish Date & Time</FormLabel>
              <div className="flex items-center gap-4">
                 <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                            format(field.value, "PPP p")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                            if (!date) return;
                            const newDate = new Date(field.value);
                            newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
                            field.onChange(newDate);
                        }}
                        disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                 <div className="flex items-center gap-2">
                    <Select
                        onValueChange={(value) => handleTimeChange('hours', value)}
                        defaultValue={String(publishDateValue.getHours())}
                    >
                        <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder="HH" />
                        </SelectTrigger>
                        <SelectContent>
                           {Array.from({ length: 24 }, (_, i) => (
                                <SelectItem key={i} value={String(i)}>{String(i).padStart(2, '0')}</SelectItem>
                           ))}
                        </SelectContent>
                    </Select>
                     <span className="font-bold">:</span>
                    <Select
                         onValueChange={(value) => handleTimeChange('minutes', value)}
                         defaultValue={String(publishDateValue.getMinutes())}
                    >
                        <SelectTrigger className="w-[80px]">
                             <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 60 }, (_, i) => (
                                 <SelectItem key={i} value={String(i)}>{String(i).padStart(2, '0')}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                 </div>
              </div>
              <FormDescription>
                Set a date and time in the future to schedule the post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea placeholder="A short summary of the article" {...field} />
              </FormControl>
               <FormDescription>This will be shown on the homepage and in search results.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (Markdown)</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your article content using Markdown." {...field} className="min-h-[300px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://placehold.co/600x400.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="imageHint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image AI Hint</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 'tech code'" {...field} />
              </FormControl>
              <FormDescription>One or two keywords for the AI image search.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="author.avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Avatar URL</FormLabel>
              <FormControl>
                <Input placeholder="https://placehold.co/40x40.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Firebase, Web Dev, Google" {...field} />
              </FormControl>
              <FormDescription>Separate tags with a comma.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} size="lg">
           {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Post"
            )}
        </Button>
      </form>
    </Form>
  );
}
