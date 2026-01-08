import { posts } from ".velite";

export type BlogPost = (typeof posts)[number];

export const BLOG_POSTS = posts.sort(
	(a, b) =>
		new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export function getBlogPost(slug: string) {
	return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogTags() {
	const tags = new Set<string>();
	for (const post of BLOG_POSTS) for (const tag of post.tags) tags.add(tag);
	return Array.from(tags).sort((a, b) => a.localeCompare(b));
}
