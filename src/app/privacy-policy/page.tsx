
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | FireBlog',
  description: 'Privacy Policy for FireBlog.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
           <div className="mb-8">
              <Button asChild variant="ghost" className="pl-0 text-muted-foreground hover:text-primary">
                  <Link href="/">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Home
                  </Link>
              </Button>
          </div>
          <div className="prose dark:prose-invert lg:prose-xl max-w-none">
            <h1>Privacy Policy for FireBlog</h1>
            <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
            
            <p>Welcome to FireBlog ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
            
            <h2>1. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <ul>
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to us when you use our contact form or subscribe to our newsletter.</li>
                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site. Our visitor tracking system anonymizes this data by assigning a unique ID.</li>
            </ul>

            <h2>2. Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul>
                <li>Respond to your comments and questions and provide customer service.</li>
                <li>Send you technical notices, updates, security alerts, and support and administrative messages.</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our Site.</li>
                <li>Send you newsletters, if you have subscribed.</li>
            </ul>

            <h2>3. Disclosure of Your Information</h2>
            <p>We do not share, sell, rent, or trade your personal information with third parties for their commercial purposes.</p>

            <h2>4. Tracking Technologies</h2>
            <h3>Cookies and Web Beacons</h3>
            <p>We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.</p>

            <h2>5. Security of Your Information</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

            <h2>6. Policy for Children</h2>
            <p>We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>
            
            <h2>7. Contact Us</h2>
            <p>If you have questions or comments about this Privacy Policy, please contact us through our <a href="/contact">contact page</a>.</p>
            
            <p><em>This is a template Privacy Policy and is not legal advice. You should consult with a legal professional to ensure it meets your specific needs.</em></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
