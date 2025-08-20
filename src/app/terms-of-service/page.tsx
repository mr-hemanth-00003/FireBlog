
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { Settings } from '@/types/settings';


export async function generateMetadata(): Promise<Metadata> {
  let siteTitle = 'FireBlog';
  try {
    const settingsDoc = await getDoc(doc(db, 'settings', 'site'));
    if (settingsDoc.exists()) {
      const settings = settingsDoc.data() as Settings;
      siteTitle = settings.siteTitle;
    }
  } catch (error) {
    console.error("Failed to fetch settings for metadata:", error);
  }
  
  return {
    title: `Terms of Service | ${siteTitle}`,
    description: `Terms of Service for ${siteTitle}.`,
  };
}


export default function TermsOfServicePage() {
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
            <h1>Terms of Service for FireBlog</h1>
            <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>

            <h2>1. Agreement to Terms</h2>
            <p>By using our website, FireBlog (the &quot;Site&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Site.</p>

            <h2>2. Intellectual Property Rights</h2>
            <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>
            <p>The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. Except as expressly provided in these Terms of Service, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.</p>

            <h2>3. User Representations</h2>
            <p>By using the Site, you represent and warrant that:</p>
            <ol>
                <li>you have the legal capacity and you agree to comply with these Terms of Service;</li>
                <li>you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise;</li>
                <li>you will not use the Site for any illegal or unauthorized purpose;</li>
                <li>your use of the Site will not violate any applicable law or regulation.</li>
            </ol>
            
            <h2>4. Prohibited Activities</h2>
            <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>

            <h2>5. Term and Termination</h2>
            <p>These Terms of Service shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON.</p>

            <h2>6. Modifications and Interruptions</h2>
            <p>We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Site without notice at any time.</p>
            
            <h2>7. Governing Law</h2>
            <p>These Terms of Service and your use of the Site are governed by and construed in accordance with the laws of the applicable jurisdiction without regard to its conflict of law principles.</p>

            <h2>8. Disclaimer</h2>
            <p>THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>

            <h2>9. Contact Us</h2>
            <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us via our <a href="/contact">contact page</a>.</p>

            <p><em>This is a template Terms of Service and is not legal advice. You should consult with a legal professional to ensure it meets your specific needs.</em></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
