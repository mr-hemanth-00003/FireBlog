
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import type { Metadata } from 'next';
import type { Settings } from '@/types/settings';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

function ContactForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  
  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addDoc(collection(db, 'contacts'), {
        ...values,
        date: new Date().toISOString(),
      });
      
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
      });
      form.reset();
    } catch(error) {
       console.error("Error adding document: ", error);
        toast({
          title: 'Error',
          description: 'Failed to send message. Please try again later.',
          variant: 'destructive',
        });
    }
  }

  return (
    <Card className="shadow-2xl glass-card">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
            <Mail className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-4xl font-headline">Get In Touch</CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Have a question or want to work with us? Drop a message below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your message here..." className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
               {isSubmitting ? (
                  <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                  </>
               ) : (
                  <>
                     Send Message
                     <Send className="ml-2 h-5 w-5" />
                  </>
               )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

// We need a server component to generate metadata
export default function ContactPage() {
  const [siteTitle, setSiteTitle] = useState('FireBlog');

  useEffect(() => {
    getDoc(doc(db, 'settings', 'site')).then(docSnap => {
      if (docSnap.exists()) {
        const settings = docSnap.data() as Settings;
        setSiteTitle(settings.siteTitle);
      }
    })
  }, []);
  
  return (
    <>
    <title>{`Contact | ${siteTitle}`}</title>
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 md:py-20 animate-fade-in-up">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
}
