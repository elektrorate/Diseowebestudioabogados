import { BlogPost, blogPosts as defaultBlogPosts } from "./blog";
import { loadContent, saveContent } from "./content-store";

export const BLOG_POSTS_STORAGE_KEY = "onlex_blog_posts_v1";

export function getBlogPosts(): BlogPost[] {
  return loadContent(BLOG_POSTS_STORAGE_KEY, defaultBlogPosts);
}

export async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  await saveContent(BLOG_POSTS_STORAGE_KEY, posts);
}

export async function deleteBlogPost(id: string): Promise<void> {
  const current = getBlogPosts();
  await saveBlogPosts(current.filter((post) => post.id !== id));
}

export async function upsertBlogPost(
  payload: Omit<BlogPost, "id" | "date"> & { id?: string; date?: string },
): Promise<void> {
  const current = getBlogPosts();
  const now = new Date().toISOString().slice(0, 10);

  if (payload.id) {
    const updated = current.map((post) =>
      post.id === payload.id
        ? {
            ...post,
            ...payload,
            date: payload.date || post.date,
          }
        : post,
    );
    await saveBlogPosts(updated);
    return;
  }

  const maxId = current.reduce((acc, item) => {
    const parsed = Number(item.id);
    if (Number.isNaN(parsed)) return acc;
    return Math.max(acc, parsed);
  }, 0);

  const nextPost: BlogPost = {
    ...payload,
    id: String(maxId + 1),
    date: payload.date || now,
  };

  await saveBlogPosts([nextPost, ...current]);
}

