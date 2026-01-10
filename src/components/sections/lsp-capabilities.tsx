import { CAPABILITIES } from "@/components/sections/capabilities-data";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function LSPCapabilities() {
	return (
		<section className="py-32 relative z-10" id="capabilities">
			<div className="container px-4 md:px-6 mx-auto">
				<div className="mb-20 flex flex-col items-center justify-between gap-8 text-center">
					<div>
						<h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
							Full Semantic Capabilities
						</h2>
						<p className="text-muted-foreground text-xl max-w-2xl mx-auto">
							Beyond simple text search. Equip your agents with deep code
							understanding.
						</p>
					</div>
				</div>

				<div className="space-y-12">
					{Object.entries(CAPABILITIES).map(([category, items]) => (
						<div key={category}>
							<h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
								<span className="w-8 h-px bg-border" />
								{category}
								<span className="flex-1 h-px bg-border" />
							</h4>
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
								{items.map((item) => (
									<Card
										key={item.cmd}
										className="group h-full relative overflow-hidden rounded-2xl border border-border glass scale-100 will-change-transform transition-[transform,scale,border-color] duration-300 hover:border-primary/20 hover:scale-[1.01]"
									>
										<CardHeader className="pb-3">
											<div className="flex items-center gap-3">
												<div className="p-2 rounded-lg bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
													<item.icon className="w-4 h-4" />
												</div>
												<CardTitle className="font-mono text-base tracking-tight">
													{item.cmd}
												</CardTitle>
											</div>
										</CardHeader>
										<CardContent className="pt-0">
											<CardDescription className="text-xs leading-relaxed">
												{item.desc}
											</CardDescription>
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 text-center">
					<p className="text-sm text-muted-foreground">
						More capabilities coming soon: Type Hierarchy, Call Hierarchy,
						Impact Analysis...
					</p>
				</div>
			</div>
		</section>
	);
}
