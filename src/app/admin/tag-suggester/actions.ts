"use server";

import { suggestArticleTags, SuggestArticleTagsInput, SuggestArticleTagsOutput } from '@/ai/flows/suggest-article-tags';

export async function getSuggestedTags(input: SuggestArticleTagsInput): Promise<SuggestArticleTagsOutput> {
  try {
    const result = await suggestArticleTags(input);
    return result;
  } catch (error) {
    console.error("Error in getSuggestedTags action:", error);
    throw new Error("Failed to get suggestions from AI flow.");
  }
}
