import { ArrowLeft } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
import { AppLink } from "@/components/app-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface BlogPostData {
	slug: string;
	title: string;
	description: string;
	publishedAt: string | Date;
	tags: string[];
	readingMinutes: number;
	content: string;
}

interface Props {
	post: BlogPostData;
	className?: string;
}

function formatDate(iso: string | Date) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return String(iso);
	return new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "short",
		day: "2-digit",
	}).format(date);
}

const markdownComponents: Components = {
	h2: ({ children }) => (
		<h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight mt-10 mb-4 text-balance">
			{children}
		</h2>
	),
	p: ({ children }) => (
		<p className="text-foreground/90 text-lg leading-relaxed mb-6">
			{children}
		</p>
	),
	blockquote: ({ children }) => (
		<blockquote className="pl-6 border-l-2 border-primary my-8 italic text-lg text-foreground/80">
			{children}
		</blockquote>
	),
	ul: ({ children }) => (
		<ul className="space-y-2 pl-5 list-disc text-foreground/90 text-lg leading-relaxed mb-6 marker:text-primary/50">
			{children}
		</ul>
	),
	ol: ({ children }) => (
		<ol className="space-y-2 pl-5 list-decimal text-foreground/90 text-lg leading-relaxed mb-6 marker:text-primary/50">
			{children}
		</ol>
	),
	code: ({ className, children, ...props }) => {
		const match = /language-(\w+)/.exec(className || "");
		const isBlock = !!match || (children as string)?.includes?.("\n");

		if (!isBlock && !match) {
			return (
				<code
					className="bg-secondary px-1.5 py-0.5 rounded-md font-mono text-sm"
					{...props}
				>
					{children}
				</code>
			);
		}

		return (
			<div className="code-panel rounded-xl overflow-hidden my-8">
				<div className="code-panel__header px-4 py-3 flex items-center justify-between select-none">
					<div className="flex items-center gap-1.5">
						<div className="code-panel__dot code-panel__dot--1" />
						<div className="code-panel__dot code-panel__dot--2" />
						<div className="code-panel__dot code-panel__dot--3" />
					</div>
					<span className="code-panel__filename text-xs font-mono opacity-80">
						{match ? match[1] : "text"}
					</span>
				</div>
				<pre className="code-panel__content p-5 overflow-x-auto text-sm md:text-[13px] leading-relaxed font-mono">
					<code className={className} {...props}>
						{children}
					</code>
				</pre>
			</div>
		);
	},
};

export function BlogPost({ post, className }: Props) {
	return (
		<div className={cn("relative z-10", className)}>
			{/* Subtle blur backdrop - reduced opacity to let background show through */}
			<div className="fixed inset-0 bg-background/60 backdrop-blur-sm -z-10 transition-all duration-500" />

			<div className="container px-4 md:px-6 mx-auto pt-10">
				<div className="mb-12 flex items-center justify-between gap-4">
					<AppLink
						href="/blog"
						className="group flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						<ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
						Back to Blog
					</AppLink>
					<div className="text-sm text-muted-foreground font-mono">
						{formatDate(post.publishedAt)} · {post.readingMinutes} min
					</div>
				</div>

				<header className="mb-16 max-w-3xl mx-auto text-center">
					<div className="flex flex-wrap items-center justify-center gap-2 mb-6">
						{post.tags.map((t) => (
							<Badge
								key={t}
								variant="secondary"
								className="rounded-md font-mono text-xs uppercase tracking-wider bg-secondary/50 hover:bg-secondary"
							>
								{t}
							</Badge>
						))}
					</div>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter mb-6 leading-[1.1] text-balance">
						{post.title}
					</h1>
					<p className="text-xl text-muted-foreground leading-relaxed text-balance max-w-2xl mx-auto">
						{post.description}
					</p>
				</header>

				<article className="space-y-2 pb-20 max-w-[680px] mx-auto">
					<ReactMarkdown components={markdownComponents}>
						{post.content}
					</ReactMarkdown>
				</article>

				<div className="border-t border-border/70 pt-10 pb-16">
					<Card className="glass">
						<CardContent className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
							<div>
								<div className="font-semibold">Continue reading</div>
								<div className="text-muted-foreground text-sm">
									Browse all posts or go back to the homepage.
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Button asChild variant="secondary">
									<AppLink href="/blog">All posts</AppLink>
								</Button>
								<Button asChild>
									<AppLink href="/">Home</AppLink>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
