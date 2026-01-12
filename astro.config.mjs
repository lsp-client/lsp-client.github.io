import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import remarkGfm from "remark-gfm";

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	markdown: {
		remarkPlugins: [remarkGfm],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
