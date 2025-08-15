"use client";

import { useState } from 'react';
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
        <Card className="shadow-lg">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline mt-4">AI Tag Suggester</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
            Paste your article content below and our AI will suggest relevant tags to improve discoverability and SEO.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid w-full gap-4">
            <Textarea
                placeholder="Paste your full article text here..."
                className="min-h-[250px] text-base p-4 focus-visible:ring-primary"
                value={articleText}
                onChange={(e) => setArticleText(e.target.value)}
                disabled={isLoading}
            />
            <Button onClick={handleSuggestTags} disabled={isLoading || !articleText} size="lg">
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
                    <Badge key={index} variant="secondary" className="text-base px-3 py-1 cursor-pointer transition-transform hover:scale-105">
                        {tag}
                    </Badge>
                    ))}
                </div>
                </CardFooter>
            )}
        </CardContent>
        </Card>
  );
}
