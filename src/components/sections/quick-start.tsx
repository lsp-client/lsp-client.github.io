import { Button } from "@/components/ui/button";
import { Check, Copy, Play } from "lucide-react";
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
      const code = ci >= 0 ? line.slice(0, ci) : line;
      const comment = ci >= 0 ? line.slice(ci) : "";
      const marked = code.replace(
        /\b(import|from|as|await|async|def|for|in|return)\b/g,
        "__KW__$1__END__"
      );
      let out = esc(marked).replace(
        /__KW__(\w+)__END__/g,
        '<span class="tk-keyword">$1</span>'
      );
      if (comment)
        out += '<span class="tk-comment">' + esc(comment) + "</span>";
      
      return `<div class="line"><span class="line-number">${i + 1}</span>${out}</div>`;
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
    <section className="py-32 relative z-10 bg-background" id="quick-start">
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
                { title: "Import", desc: "Type-safe clients for every language" },
                { title: "Execute", desc: "Async API for high-performance agents" }
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
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-indigo-500/30 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
            
            <div className="code-panel relative rounded-2xl shadow-2xl overflow-hidden border border-border/50 bg-[#1e1e1e]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#252526]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center text-xs font-mono text-zinc-400 gap-2">
                   <span className="opacity-50">/</span>
                   <span>example.py</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/10"
                        onClick={copyToClipboard}
                    >
                        {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                        ) : (
                        <Copy className="h-4 w-4" />
                        )}
                    </Button>
                </div>
              </div>
              
              <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
                <pre className="text-sm font-mono leading-relaxed">
                  <code dangerouslySetInnerHTML={{ __html: highlighted }} />
                </pre>
              </div>
              
              <div className="absolute bottom-4 right-4">
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-500 text-xs font-mono border border-green-500/20">
                    <Play className="w-3 h-3 fill-current" />
                    <span>Running</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .line { display: flex; }
        .line-number { 
            display: inline-block; 
            width: 2rem; 
            color: #6e7681; 
            text-align: right; 
            margin-right: 1.5rem; 
            user-select: none;
            opacity: 0.5;
        }
        .tk-keyword { color: #ff7b72; font-style: italic; }
        .tk-string { color: #a5d6ff; }
        .tk-number { color: #79c0ff; }
        .tk-comment { color: #8b949e; font-style: italic; }
      `}</style>
    </section>
  );
}
