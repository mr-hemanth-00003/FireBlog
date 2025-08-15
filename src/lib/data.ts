
export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageHint: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  publishDate: string; // Should be ISO string
  tags: string[];
  isArchived: boolean;
}
