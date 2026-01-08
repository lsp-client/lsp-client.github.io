import { defineCollection, defineConfig, s } from "velite";

const posts = defineCollection({
	name: "posts",
	pattern: "blog/**/*.md",
	schema: s
		.object({
			slug: s.slug("posts"),
			title: s.string().max(99),
			description: s.string().max(999).optional(),
			publishedAt: s.isodate(),
			tags: s.array(s.string()).default([]),
			readingMinutes: s.number().default(1),
			content: s.custom().transform((data, { meta }) => meta.content || ""),
		})
		.transform((data) => ({ ...data, permalink: `/blog/${data.slug}` })),
});

export default defineConfig({
	root: "src/content",
	output: {
		data: ".velite",
		assets: "public/static",
		base: "/static/",
		name: "[name]-[hash:6].[ext]",
		clean: true,
	},
	collections: { posts },
	markdown: {
		// We can keep default remark/rehype plugins if we use Velite's compiler.
		// But since the current app uses `react-markdown` on the client side,
		// we might just want to pass the raw content through.
		// However, Velite is powerful because it compiles at build time.
		// If we use s.markdown(), we get HTML. We can use `dangerouslySetInnerHTML`.
		// If we want to keep `react-markdown`, we should use a custom field for raw content.
	},
	prepare: ({ posts }) => {
		// Optional: side effects
	},
});
