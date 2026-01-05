import { Background } from "@/components/background";
import { ModeToggle } from "@/components/mode-toggle";
import { Architecture } from "@/components/sections/architecture";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Languages } from "@/components/sections/languages";
import { QuickStart } from "@/components/sections/quick-start";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import logo from "./assets/lsp-logo.svg";

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="lsp-client-theme">
      <div className="min-h-screen relative overflow-x-hidden font-sans bg-background text-foreground selection:bg-primary/20">
        <Background />

        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 glass-strong">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo - Opencode style: Pixel/Block font or Bold Sans */}
            <div className="flex items-center gap-3">
              <img src={logo} alt="LSP Client Logo" className="h-6 w-6" />
              <span className="font-display font-bold text-xl tracking-tighter">
                lsp-client
              </span>
            </div>

            {/* Nav - Minimalist */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
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
              <a
                href="https://github.com/lsp-client/lsp-client"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <ModeToggle />
              <Button size="sm" className="hidden sm:flex font-mono text-xs" asChild>
                 <a href="https://github.com/lsp-client/lsp-client" target="_blank">
                    <Github className="w-3 h-3 mr-2" />
                    Star
                 </a>
              </Button>
            </div>
          </div>
        </header>

        <main>
          <Hero />
          <Architecture />
          <QuickStart />
          <Languages />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
