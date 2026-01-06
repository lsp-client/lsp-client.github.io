import { Terminal } from "lucide-react";

const languages = [
	{
		name: "Python",
		server: "Pyright, Ruff",
		image: "ghcr.io/lsp-client/pyright",
	},
	{
		name: "Rust",
		server: "Rust Analyzer",
		image: "ghcr.io/lsp-client/rust-analyzer",
	},
	{ name: "Go", server: "Gopls", image: "ghcr.io/lsp-client/gopls" },
	{
		name: "TypeScript/JS",
		server: "TS Server",
		image: "ghcr.io/lsp-client/typescript",
	},
	{ name: "C/C++", server: "Clangd", image: "ghcr.io/lsp-client/clangd" },
	{ name: "Java", server: "JDTLS", image: "ghcr.io/lsp-client/jdtls" },
	{
		name: "Swift",
		server: "SourceKit-LSP",
		image: "ghcr.io/lsp-client/sourcekit-lsp",
	},
	{ name: "Vue", server: "Volar", image: "ghcr.io/lsp-client/vue" },
];

export function Languages() {
	return (
		<section className="py-32 relative z-10 overflow-hidden" id="languages">
			<div className="absolute inset-0 bg-muted/30 skew-y-3 transform origin-top-left scale-110 -z-10" />

			<div className="container px-4 md:px-6 mx-auto">
				<div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
					<div className="max-w-2xl">
						<h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
							Supported Languages
						</h2>
						<p className="text-muted-foreground text-xl">
							Ready-to-run language servers in OCI containers—just pick a
							language and go.
						</p>
					</div>

					<a
						href="https://github.com/lsp-client/containers"
						className="group flex items-center gap-2 px-6 py-3 rounded-full bg-background border border-border hover:border-primary transition-colors duration-300"
					>
						<span className="font-medium">Explore Registry</span>
						<Terminal className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
					</a>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{languages.map((lang, _index) => (
						<div
							key={lang.name}
							className="group p-6 rounded-2xl border border-border glass-light transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-[rgba(255,255,255,0.7)] dark:hover:bg-[rgba(24,24,27,0.7)]"
						>
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-display font-bold text-xl">{lang.name}</h3>
								<div className="w-2 h-2 rounded-full bg-green-500/70 group-hover:bg-green-500 transition-colors" />
							</div>

							<div className="space-y-4">
								<div className="text-sm text-muted-foreground">
									{lang.server}
								</div>

								<code className="text-xs font-mono text-muted-foreground group-hover:text-foreground break-all transition-colors block select-all">
									{lang.image}
								</code>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
