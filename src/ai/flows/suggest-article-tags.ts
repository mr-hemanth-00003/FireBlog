'use server';

/**
 * @fileOverview AI flow to suggest relevant tags or categories for a blog post based on the article text.
 *
 * - suggestArticleTags - A function that handles the tag suggestion process.
 * - SuggestArticleTagsInput - The input type for the suggestArticleTags function.
 * - SuggestArticleTagsOutput - The return type for the suggestArticleTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestArticleTagsInputSchema = z.object({
  articleText: z.string().describe('The text content of the article.'),
});
export type SuggestArticleTagsInput = z.infer<typeof SuggestArticleTagsInputSchema>;

const SuggestArticleTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of suggested tags or categories for the article.'),
});
export type SuggestArticleTagsOutput = z.infer<typeof SuggestArticleTagsOutputSchema>;

export async function suggestArticleTags(input: SuggestArticleTagsInput): Promise<SuggestArticleTagsOutput> {
  return suggestArticleTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestArticleTagsPrompt',
  input: {schema: SuggestArticleTagsInputSchema},
  output: {schema: SuggestArticleTagsOutputSchema},
  prompt: `You are a content optimization expert. Given the following article text, suggest relevant tags or categories to improve discoverability. Return a JSON array of strings.

Article Text: {{{articleText}}}`,
});

const suggestArticleTagsFlow = ai.defineFlow(
  {
    name: 'suggestArticleTagsFlow',
    inputSchema: SuggestArticleTagsInputSchema,
    outputSchema: SuggestArticleTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
