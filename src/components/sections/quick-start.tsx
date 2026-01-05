import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";

const code = `import anyio
from lsp_client.clients.pyright import PyrightClient, PyrightContainerServer
from lsp_client.common import Position

async def main():
    # Run Pyright in an isolated container
    async with PyrightClient(server=PyrightContainerServer()) as client:
        definitions = await client.request_definition_locations(
            file_path="app.py",
            position=Position(line=10, character=5)
        )
        for loc in definitions:
            print(f"Found definition: {loc.uri} at {loc.range}")

anyio.run(main)`;

function highlightPython(src: string) {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return src
    .split("\n")
    .map((line, i) => {
      const ci = line.indexOf("#");
      const codePart = ci >= 0 ? line.slice(0, ci) : line;
      const comment = ci >= 0 ? line.slice(ci) : "";

      let highlighted = codePart;

      // 1. Strings
      highlighted = highlighted.replace(
        /(f?(?:"[^"]*"|'[^']*'))/g,
        "__STR__$1__END__"
      );

      // 2. Keywords
      highlighted = highlighted.replace(
        /\b(import|from|as|await|async|def|for|in|return|with|class|if|else|elif|while|try|except|finally)\b/g,
        "__KW__$1__END__"
      );

      // 3. Classes and Functions
      highlighted = highlighted.replace(/\b([A-Z]\w+)\b/g, "__CLS__$1__END__");
      highlighted = highlighted.replace(
        /\b([a-z_]\w+)(?=\s*\()/g,
        "__FN__$1__END__"
      );

      // 4. Numbers
      highlighted = highlighted.replace(/\b(\d+)\b/g, "__NUM__$1__END__");

      // 5. Built-ins (simple ones)
      highlighted = highlighted.replace(
        /\b(print|range|len|type|int|str|list|dict|set|tuple)\b/g,
        "__BI__$1__END__"
      );

      let out = esc(highlighted)
        .replace(/__STR__(.+?)__END__/g, '<span class="tk-string">$1</span>')
        .replace(/__KW__(\w+)__END__/g, '<span class="tk-keyword">$1</span>')
        .replace(/__CLS__(\w+)__END__/g, '<span class="tk-class">$1</span>')
        .replace(/__FN__(\w+)__END__/g, '<span class="tk-function">$1</span>')
        .replace(/__BI__(\w+)__END__/g, '<span class="tk-builtin">$1</span>')
        .replace(/__NUM__(\d+)__END__/g, '<span class="tk-number">$1</span>');

      if (comment)
        out += '<span class="tk-comment">' + esc(comment) + "</span>";

      return `<div class="line"><span class="line-number">${
        i + 1
      }</span>${out}</div>`;
    })
    .join("");
}

export function QuickStart() {
  const [copied, setCopied] = useState(false);
  const highlighted = useMemo(() => highlightPython(code), []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 relative z-10" id="quick-start">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
              Instant Intelligence
            </h2>
            <p className="text-muted-foreground text-xl mb-12 leading-relaxed">
              Integrate language intelligence into your Python projects with
              just a few lines of code. Our SDK handles the complexity of LSP
              communication and container orchestration.
            </p>

            <div className="space-y-8">
              {[
                { title: "Install", desc: "pip install lsp-client" },
                {
                  title: "Import",
                  desc: "Type-safe clients for every language",
                },
                {
                  title: "Execute",
                  desc: "Async API for high-performance agents",
                },
              ].map((step, i) => (
                <div key={i} className="flex items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mr-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group order-1 lg:order-2">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-[2.5rem] blur-3xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>

            <div className="code-panel relative rounded-2xl overflow-hidden border border-border/50 glass">
              <div className="code-panel__header flex items-center justify-between px-6 py-3 bg-muted/30 border-b border-border/50">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="code-panel__filename flex items-center text-[11px] font-mono tracking-wider uppercase opacity-60">
                  <span className="mr-1.5 opacity-40">~/</span>
                  <span>example.py</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-muted rounded-md transition-colors"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 opacity-60" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="code-panel__content px-6 py-6 overflow-x-auto custom-scrollbar">
                <pre className="text-[13.5px] font-mono leading-relaxed">
                  <code
                    className="block min-w-full"
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                  />
                </pre>
              </div>

              <div className="absolute bottom-5 right-6 pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary/70 text-[10px] font-mono border border-primary/10 backdrop-blur-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="uppercase tracking-widest font-bold">
                    LSP Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .line { 
          display: flex;
          min-height: 1.6em;
        }
        .line-number { 
            display: inline-block; 
            width: 2rem; 
            color: var(--code-line-number); 
            text-align: right; 
            margin-right: 2rem; 
            user-select: none;
            opacity: 0.4;
            flex-shrink: 0;
            font-size: 0.85em;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}
