import { AppLink } from "@/components/app-link";
import { Background } from "@/components/background";
import { BlogIndex } from "@/components/blog/blog-index";
import { BlogPost } from "@/components/blog/blog-post";
import { ModeToggle } from "@/components/mode-toggle";
import { Architecture } from "@/components/sections/architecture";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Languages } from "@/components/sections/languages";
import { QuickStart } from "@/components/sections/quick-start";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/lib/router";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";

export function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";
  const isHome = normalizedPathname === "/";

  const blogSlug = (() => {
    if (normalizedPathname === "/blog") return null;
    if (!normalizedPathname.startsWith("/blog/")) return null;
    const raw = normalizedPathname.slice("/blog/".length);
    if (!raw) return null;
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  })();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ThemeProvider storageKey="lsp-client-theme">
      <div className="min-h-screen relative overflow-x-hidden font-sans bg-background text-foreground selection:bg-primary/20">
        <Background />

        <header
          className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            isScrolled
              ? "border-b border-border/50 glass-strong py-0"
              : "bg-transparent border-transparent py-2"
          )}
        >
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo - Opencode style: Pixel/Block font or Bold Sans */}
            <div className="flex items-center">
              <AppLink
                href="/"
                className="font-display font-bold text-xl tracking-tighter"
              >
                lsp-client
              </AppLink>
            </div>

            {/* Nav - Minimalist */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              {isHome ? (
                <>
                  <a
                    href="#architecture"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Architecture
                  </a>
                  <a
                    href="#quick-start"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Quick Start
                  </a>
                  <a
                    href="#languages"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Languages
                  </a>
                  <AppLink
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </AppLink>
                  <a
                    href="https://github.com/lsp-client/lsp-client"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </>
              ) : (
                <>
                  <AppLink
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Home
                  </AppLink>
                  <AppLink
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </AppLink>
                  <a
                    href="https://github.com/lsp-client/lsp-client"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </>
              )}
            </nav>

            <div className="flex items-center gap-4">
              <ModeToggle />
              <Button
                size="sm"
                className="hidden sm:flex font-mono text-xs"
                asChild
              >
                <a
                  href="https://github.com/lsp-client/lsp-client"
                  target="_blank"
                >
                  <Github className="w-3 h-3 mr-2" />
                  Star
                </a>
              </Button>
            </div>
          </div>
        </header>

        <main className={cn(isHome ? "" : "pt-24")}>
          {isHome ? (
            <>
              <Hero />
              <Architecture />
              <QuickStart />
              <Languages />
            </>
          ) : blogSlug ? (
            <BlogPost slug={blogSlug} />
          ) : normalizedPathname === "/blog" ? (
            <BlogIndex />
          ) : (
            <NotFound />
          )}
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

function NotFound() {
  return (
    <div className="relative z-10">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="glass rounded-2xl border border-border p-8 md:p-10">
          <div className="text-2xl font-semibold mb-2">Page not found</div>
          <div className="text-muted-foreground mb-6">
            The page you are looking for does not exist.
          </div>
          <div className="flex items-center gap-3">
            <Button asChild>
              <AppLink href="/">Home</AppLink>
            </Button>
            <Button asChild variant="secondary">
              <AppLink href="/blog">Blog</AppLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
