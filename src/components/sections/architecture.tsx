import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, Brain, Layers, Terminal } from "lucide-react";

const items = [
  {
    title: "LSP Client",
    subtitle: "The Foundation",
    description:
      "Industrial-strength Python SDK. Async-native architecture built on AnyIO for fine-grained protocol control.",
    icon: Box,
    href: "https://github.com/lsp-client/lsp-client/",
    features: ["Protocol Native", "Async-First", "Container Registry"],
  },
  {
    title: "LSAP",
    subtitle: "The Abstraction",
    description:
      "Language Server Agent Protocol. Semantic abstraction layer transforming granular LSP ops into agent-ready snapshots.",
    icon: Layers,
    href: "https://github.com/lsp-client/LSAP",
    features: ["Agent-Centric", "Semantic Context", "RPC -> Markdown"],
  },
  {
    title: "LSP CLI",
    subtitle: "The Toolchain",
    description:
      "Universal command-line interface bringing LSP capabilities to any terminal pipeline or automation script.",
    icon: Terminal,
    href: "https://github.com/lsp-client/lsp-cli",
    features: ["Human Readable", "Universal Interface", "Scriptable"],
  },
  {
    title: "LSP Skill",
    subtitle: "The Intelligence",
    description:
      "High-level repository analysis capabilities designed specifically for Coding Agents like Claude.",
    icon: Brain,
    href: "https://github.com/lsp-client/lsp-skill",
    features: ["Deep Understanding", "Cross-file Analysis", "Plugin Ready"],
  },
];

export function Architecture() {
  return (
    <section className="py-32 relative z-10" id="architecture">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              System Architecture
            </h2>
            <p className="text-muted-foreground text-xl max-w-xl">
              From Protocol to Intelligence. A layered stack evolving raw
              capabilities into semantic understanding.
            </p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-border ml-8 mb-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative"
            >
              <Card className="h-full relative overflow-hidden rounded-2xl border border-border glass transition-all duration-300 hover:border-primary/20 hover:scale-[1.01]">
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <item.icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-xs tracking-wider uppercase opacity-50">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                      {item.subtitle}
                    </span>
                    <CardTitle className="text-2xl font-display">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-6 text-muted-foreground">
                    {item.description}
                  </CardDescription>
                  <ul className="space-y-2">
                    {item.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-sm font-medium text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
