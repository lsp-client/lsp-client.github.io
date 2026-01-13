import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	markdown: {
		remarkPlugins: [remarkGfm, remarkMath],
		rehypePlugins: [[rehypeKatex, {
			output: 'html'
		}]],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
