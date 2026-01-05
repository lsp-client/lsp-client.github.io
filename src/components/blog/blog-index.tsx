import { BLOG_POSTS, getAllBlogTags } from "@/blog/posts";
import { AppLink } from "@/components/app-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

interface Props {
  className?: string;
}

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export function BlogIndex({ className }: Props) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(() => getAllBlogTags(), []);

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_POSTS.slice()
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .filter((p) => {
        if (tag && !p.tags.includes(tag)) return false;
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      });
  }, [query, tag]);

  return (
    <div className={cn("relative z-10", className)}>
      <div className="container px-4 md:px-6 mx-auto pb-20">
        <div className="mb-10 md:mb-14">
          <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-3">
                Blog
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
                Notes on agentic coding, LSP semantics, and building a practical
                toolchain.
              </p>
            </div>
            <div className="w-full md:w-[420px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="search-posts"
                  name="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search posts, tags…"
                  className="pl-9 h-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10">
          <Button
            type="button"
            size="sm"
            variant={tag === null ? "default" : "secondary"}
            onClick={() => setTag(null)}
            className="rounded-full"
          >
            All
          </Button>
          {tags.map((t) => (
            <Button
              key={t}
              type="button"
              size="sm"
              variant={tag === t ? "default" : "secondary"}
              onClick={() => setTag(t)}
              className="rounded-full"
            >
              {t}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
          <div className="space-y-6">
            {posts.length === 0 ? (
              <Card className="glass">
                <CardHeader>
                  <CardTitle>No results</CardTitle>
                  <CardDescription>
                    Try a different keyword or tag.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              posts.map((post) => (
                <AppLink
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <Card className="glass transition-all duration-300 hover:border-primary/20 hover:scale-[1.01]">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-6">
                        <div className="min-w-0">
                          <CardTitle className="text-xl md:text-2xl group-hover:text-primary transition-colors">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="mt-2 text-base leading-relaxed">
                            {post.description}
                          </CardDescription>
                        </div>
                        <div className="hidden sm:flex items-center text-muted-foreground">
                          <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                          {post.tags.map((t) => (
                            <Badge
                              key={t}
                              variant="outline"
                              className="rounded-full"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground font-mono">
                          {formatDate(post.publishedAt)} · {post.readingMinutes}{" "}
                          min
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AppLink>
              ))
            )}
          </div>

          <aside className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-base">About this blog</CardTitle>
                <CardDescription>
                  Short, high-signal notes. Mostly architecture, protocol
                  design, and practical agent workflows.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <Badge className="rounded-full" variant="secondary">
                  {BLOG_POSTS.length} posts
                </Badge>
                {tag ? (
                  <Badge className="rounded-full" variant="outline">
                    filter: {tag}
                  </Badge>
                ) : null}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
