import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishedAt: z.coerce.date(),
		tags: z.array(z.string()).default([]),
		readingMinutes: z.number().optional(),
	}),
});

export const collections = { blog };
