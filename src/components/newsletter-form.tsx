
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});

export function NewsletterForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call for newsletter signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Newsletter signup:", values);
    
    toast({
      title: "Subscribed!",
      description: "Thanks for signing up for our newsletter.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <div className="relative">
                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                   <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      {...field} 
                      className="pl-9"
                      disabled={isSubmitting}
                    />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} variant="outline" className="shrink-0">
           {isSubmitting ? 'Joining...' : 'Join'}
        </Button>
      </form>
    </Form>
  );
}
