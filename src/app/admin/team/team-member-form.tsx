

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  role: z.string().min(2, { message: "Role must be at least 2 characters long." }),
  bio: z.string().min(10, { message: 'Bio must be at least 10 characters long.' }),
  avatarUrl: z.string().url({ message: 'Please enter a valid avatar URL.' }),
  social: z.object({
      twitter: z.string().url({ message: "Please enter a valid Twitter URL." }).or(z.literal('')).optional(),
      github: z.string().url({ message: "Please enter a valid GitHub URL." }).or(z.literal('')).optional(),
      linkedin: z.string().url({ message: "Please enter a valid LinkedIn URL." }).or(z.literal('')).optional(),
  }),
});

export type TeamMemberFormValues = z.infer<typeof formSchema>;

interface TeamMemberFormProps {
  onSubmit: (data: TeamMemberFormValues) => Promise<void>;
  defaultValues?: Partial<TeamMemberFormValues>;
}

export function TeamMemberForm({ onSubmit, defaultValues }: TeamMemberFormProps) {
  const form = useForm<TeamMemberFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      role: defaultValues?.role || '',
      bio: defaultValues?.bio || '',
      avatarUrl: defaultValues?.avatarUrl || 'https://placehold.co/100x100.png',
      social: {
        twitter: defaultValues?.social?.twitter || '',
        github: defaultValues?.social?.github || '',
        linkedin: defaultValues?.social?.linkedin || '',
      },
    },
  });

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role / Position</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Lead Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief description of the team member." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input placeholder="https://placehold.co/100x100.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="social.twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter URL (Optional)</FormLabel>
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
              <FormLabel>GitHub URL (Optional)</FormLabel>
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
              <FormLabel>LinkedIn URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/username" {...field} />
              </FormControl>
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
              "Save Member"
            )}
        </Button>
      </form>
    </Form>
  );
}
