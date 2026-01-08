import { GithubIcon } from "@/components/ui/github-icon";

export function Footer() {
	return (
		<footer className="py-20 border-t border-border bg-background relative z-10">
			<div className="container px-4 md:px-6 mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-12">
					<div className="col-span-1 md:col-span-2">
						<h3 className="text-2xl font-display font-bold mb-6">
							IntelliSense for Agentic Coding
						</h3>
						<p className="text-muted-foreground text-lg max-w-sm leading-relaxed">
							Building the future of AI-native software engineering.
							Transforming the Language Server Protocol into actionable
							repository intelligence.
						</p>
					</div>

					<div>
						<h4 className="font-bold text-lg mb-6">Ecosystem</h4>
						<ul className="space-y-4">
							<li>
								<a
									href="https://github.com/lsp-client/lsp-client"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									LSP Client
								</a>
							</li>
							<li>
								<a
									href="https://github.com/lsp-client/LSAP"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									LSAP
								</a>
							</li>
							<li>
								<a
									href="https://github.com/lsp-client/lsp-cli"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									LSP CLI
								</a>
							</li>
							<li>
								<a
									href="https://github.com/lsp-client/lsp-skill"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									LSP Skill
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-bold text-lg mb-6">Community</h4>
						<ul className="space-y-4">
							<li>
								<a
									href="https://github.com/lsp-client"
									className="text-muted-foreground hover:text-primary transition-colors flex items-center"
								>
									<GithubIcon className="h-4 w-4 mr-2" /> GitHub
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center opacity-60">
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} LSP Client Team. All rights reserved.
					</p>
					<div className="mt-4 md:mt-0 text-sm text-muted-foreground">
						Built with ❤️ by the LSP Client team.
					</div>
				</div>
			</div>
		</footer>
	);
}
