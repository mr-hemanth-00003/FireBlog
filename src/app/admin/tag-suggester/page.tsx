"use client";

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getSuggestedTags } from './actions';

export default function TagSuggesterPage() {
  const [articleText, setArticleText] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSuggestTags = async () => {
    if (!articleText.trim()) {
      toast({
        title: "Error",
        description: "Article text cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSuggestedTags([]);

    try {
      const result = await getSuggestedTags({ articleText });
      if (result.tags && result.tags.length > 0) {
        setSuggestedTags(result.tags);
      } else {
        toast({
          title: "No suggestions found",
          description: "The AI couldn't find any relevant tags for this text. Try providing more content.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "An unexpected error occurred",
        description: "Failed to get suggestions. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Sparkles className="h-8 w-8 text-primary" />
                <CardTitle className="text-3xl font-headline">AI Tag Suggester</CardTitle>
              </div>
              <CardDescription className="text-lg">
                Paste your article content below and our AI will suggest relevant tags to improve discoverability and SEO.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full gap-4">
                <Textarea
                  placeholder="Paste your full article text here..."
                  className="min-h-[250px] text-base p-4"
                  value={articleText}
                  onChange={(e) => setArticleText(e.target.value)}
                  disabled={isLoading}
                />
                <Button onClick={handleSuggestTags} disabled={isLoading} size="lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Suggest Tags"
                  )}
                </Button>
              </div>

              {suggestedTags.length > 0 && (
                 <CardFooter className="flex-col items-start gap-4 mt-8 pt-6 border-t">
                  <h3 className="text-lg font-semibold">Suggested Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags.map((tag, index) => (
                      <Badge key={index} variant="default" className="text-base px-3 py-1 cursor-pointer transition-transform hover:scale-105">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
