import Link from 'next/link';
import { Feather, Github, Twitter, Linkedin, Rss } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { NewsletterForm } from './newsletter-form';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-8">
          
          <div className="md:col-span-4 lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <Feather className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold font-headline">FireBlog</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              The modern blog for developers. Explore the latest in web technology, from frontend frameworks to backend architecture.
            </p>
            <NewsletterForm />
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h3 className="font-semibold font-headline text-foreground mb-4">Navigation</h3>
            <nav className="flex flex-col gap-3">
             <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline underline-offset-4">Home</Link>
             <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline underline-offset-4">About</Link>
             <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline underline-offset-4">Contact</Link>
            </nav>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="font-semibold font-headline text-foreground mb-4">Legal</h3>
            <nav className="flex flex-col gap-3">
             <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline underline-offset-4">Privacy Policy</Link>
             <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline underline-offset-4">Terms of Service</Link>
            </nav>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="font-semibold font-headline text-foreground mb-4">Connect</h3>
             <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="icon">
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href="#" aria-label="GitHub">
                  <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              </Button>
               <Button asChild variant="ghost" size="icon">
                <Link href="#" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              </Button>
               <Button asChild variant="ghost" size="icon">
                <Link href="#" aria-label="RSS Feed">
                  <Rss className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
           <p>&copy; {currentYear} FireBlog. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
