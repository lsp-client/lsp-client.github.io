import { Sparkles } from "lucide-react";

const languages = [
	{
		name: "Python",
		server: "Basedpyright",
		url: "https://github.com/detachhead/basedpyright",
	},
	{
		name: "TypeScript",
		server: "TypeScript Language Service",
		url: "https://github.com/microsoft/TypeScript",
	},
	{
		name: "Go",
		server: "Gopls",
		url: "https://github.com/golang/tools/tree/master/gopls",
	},
	{
		name: "Rust",
		server: "Rust Analyzer",
		url: "https://rust-analyzer.github.io/",
	},
	{
		name: "Deno",
		server: "Deno Language Server",
		url: "https://deno.com/",
	},
];

export function Languages() {
	return (
		<section className="py-32 relative z-10 overflow-hidden" id="languages">
			<div className="absolute inset-0 bg-muted/30 skew-y-3 transform origin-top-left scale-110 -z-10" />

			<div className="container px-4 md:px-6 mx-auto">
				<div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
					<div className="w-full">
						<h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
							Current Supported Languages
						</h2>
						<p className="text-muted-foreground text-xl max-w-2xl">
							Advanced repository analysis powered by industry-standard Language
							Servers.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
					{languages.map((lang, _index) => (
						<a
							key={lang.name}
							href={lang.url}
							target="_blank"
							rel="noopener noreferrer"
							className="group p-6 rounded-2xl border border-border glass-light transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:bg-accent/50 block relative overflow-hidden"
						>
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-display font-bold text-xl group-hover:text-primary transition-colors duration-300">
									{lang.name}
								</h3>
								<div className="w-2 h-2 rounded-full bg-green-500/70 group-hover:bg-green-500 transition-all duration-300" />
							</div>

							<div className="space-y-4">
								<span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 block">
									{lang.server}
								</span>
							</div>
						</a>
					))}
				</div>

				{/* Coming Soon Section */}
				<div className="relative rounded-2xl border border-dashed border-muted-foreground/20 bg-muted/5 p-8 text-center overflow-hidden group hover:border-primary/30 hover:bg-muted/10 transition-all duration-500">
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out -z-10" />

					<div className="flex flex-col items-center justify-center gap-4">
						<div className="p-4 rounded-full bg-primary/10 text-primary mb-2 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
							<Sparkles className="w-6 h-6" />
						</div>
						<h3 className="text-2xl font-display font-bold">
							More server support coming soon
						</h3>
						<p className="text-muted-foreground max-w-md mx-auto text-lg">
							We are continuously expanding our ecosystem with more languages
							and advanced LSP capabilities.
						</p>
						<div className="flex gap-2 mt-4 opacity-60">
							<div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
							<div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse delay-150" />
							<div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse delay-300" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
