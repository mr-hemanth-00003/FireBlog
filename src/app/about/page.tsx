import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | FireBlog',
  description: 'Learn more about the team and mission behind FireBlog.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-12 md:py-20 animate-fade-in-up">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight mb-4">About FireBlog</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Welcome to FireBlog, a place where technology, creativity, and passion for development converge. We're dedicated to providing high-quality articles and tutorials for the modern web developer.
            </p>
          </section>
          
          <Card className="mb-12 overflow-hidden shadow-lg">
             <Image
                src="https://placehold.co/1200x500.png"
                alt="Our Team"
                width={1200}
                height={500}
                className="w-full object-cover"
                data-ai-hint="team working"
              />
          </Card>
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold font-headline text-center mb-8">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
              Our mission is to empower developers by sharing knowledge, exploring new technologies, and fostering a community of learners and innovators. We believe in the power of open-source and collaborative learning to push the boundaries of what's possible on the web.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold font-headline text-center mb-10">Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map(member => (
                <Card key={member.name} className="text-center p-6 transition-all hover:shadow-xl hover:-translate-y-1">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold font-headline">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-4">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={member.social.twitter} target="_blank"><Twitter className="h-5 w-5" /></Link>
                    </Button>
                     <Button asChild variant="ghost" size="icon">
                      <Link href={member.social.github} target="_blank"><Github className="h-5 w-5" /></Link>
                    </Button>
                     <Button asChild variant="ghost" size="icon">
                      <Link href={member.social.linkedin} target="_blank"><Linkedin className="h-5 w-5" /></Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}


const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'Founder & Lead Writer',
    bio: 'Jane is a full-stack developer with a passion for Firebase and modern web architecture. She started FireBlog to share her knowledge with the world.',
    avatarUrl: 'https://placehold.co/128x128.png',
    social: {
      twitter: '#',
      github: '#',
      linkedin: '#'
    }
  },
  {
    name: 'John Smith',
    role: 'Frontend Specialist',
    bio: 'John lives and breathes CSS. He is the creative force behind the look and feel of our blog and specializes in creating beautiful user interfaces.',
    avatarUrl: 'https://placehold.co/128x128.png',
    social: {
      twitter: '#',
      github: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Alex Johnson',
    role: 'SEO & Content Strategist',
    bio: 'Alex ensures our content reaches the right audience. With a background in digital marketing, they are the expert in all things SEO.',
    avatarUrl: 'https://placehold.co/128x128.png',
    social: {
      twitter: '#',
      github: '#',
      linkedin: '#'
    }
  }
];
