import { Blocks, BookOpen, Zap } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const items = [
	{
		title: "Foundation Expansion",
		subtitle: "LSP Client",
		description:
			"The underlying library continuously expands support for more language ecosystems (Python, Rust, Go, etc.) and integrates new LSP 3.17 standard capabilities like Type Hierarchy and Call Hierarchy.",
		icon: Blocks,
		href: "https://github.com/lsp-client/lsp-client",
		features: ["Broader Language Support", "LSP 3.17 Specification Coverage"],
	},
	{
		title: "Capability Expansion",
		subtitle: "LSAP Protocol",
		description:
			"Continuously designs composed capabilities like Relation API and Impact Analysis, while optimizing Markdown output formats based on Progressive Disclosure for better LLM reasoning.",
		icon: Zap,
		href: "https://github.com/lsp-client/LSAP",
		features: ["Advanced Analysis Capabilities", "Optimized Output Formats"],
	},
	{
		title: "Scenario Expansion",
		subtitle: "Best Practice System",
		description:
			"A modular system enabling community contributions of domain-specific workflows (Frontend, Backend) and framework specializations (Django, React) to cover every development scenario.",
		icon: BookOpen,
		href: "https://github.com/lsp-client/lsp-skill",
		features: ["Domain Expert Knowledge", "Framework Specialization"],
	},
];

export function Extensibility() {
	return (
		<section className="py-32 relative z-10" id="extensibility">
			<div className="container px-4 md:px-6 mx-auto">
				<div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
					<div>
						<h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
							Extensibility
						</h2>
						<p className="text-muted-foreground text-xl max-w-xl">
							A three-tier extensibility design ensuring continuous growth and
							adaptation to new needs.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
					{items.map((item, index) => (
						<a
							key={item.title}
							href={item.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group block relative cursor-pointer"
						>
							<Card className="h-full relative overflow-hidden rounded-2xl border border-border glass scale-100 will-change-transform transition-[transform,scale,border-color] duration-300 hover:border-primary/20 hover:scale-[1.01]">
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
										{item.features.map((feature) => (
											<li
												key={feature}
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
