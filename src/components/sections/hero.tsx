import { ArrowRight, Copy } from "lucide-react";
import { useState } from "react";
import { AppLink } from "@/components/app-link";
import { Button } from "@/components/ui/button";

type InstallTargetId = "skill" | "cli-tool" | "lsp-sdk";

const INSTALL_TARGETS: Array<{
	id: InstallTargetId;
	label: string;
	command: string;
}> = [
	{
		id: "skill",
		label: "Agent Skill",
		command: "openskills add lsp-client/lsp-skill",
	},
	{
		id: "cli-tool",
		label: "CLI tool",
		command: "uv tool install lsp-cli",
	},
	{
		id: "lsp-sdk",
		label: "LSP SDK",
		command: "uv add lsp-client",
	},
];

export function Hero() {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isExpandedAgentic, setIsExpandedAgentic] = useState(false);
	const [copied, setCopied] = useState(false);
	const [installTarget, setInstallTarget] = useState<InstallTargetId>("skill");
	const installCmd =
		INSTALL_TARGETS.find((t) => t.id === installTarget)?.command ??
		(INSTALL_TARGETS[0] as { command: string }).command;

	const copyCommand = () => {
		navigator.clipboard.writeText(installCmd);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section className="relative min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center pt-8 pb-32">
			<div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
				{/* Badge - Simple version number */}
				<AppLink
					href="/blog/latest-update"
					aria-label="Latest Update"
					className="inline-flex items-center gap-2 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:opacity-90 transition-opacity"
				>
					<span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full font-mono">
						v0.1.0
					</span>
					<span className="text-muted-foreground text-sm font-medium">
						Agent-Native Ecosystem
					</span>
				</AppLink>

				{/* Main Heading */}
				<h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter text-foreground mb-6 max-w-6xl mx-auto leading-tight md:leading-[1.15] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 selection:bg-primary selection:text-primary-foreground">
					<div className="inline-flex flex-col items-center align-top group">
						<button
							type="button"
							onClick={() => setIsExpanded(!isExpanded)}
							className="bg-transparent p-0 underline decoration-dashed underline-offset-8 decoration-2 decoration-foreground/30 hover:decoration-primary cursor-help"
						>
							IntelliSense
						</button>
						<div className="w-0 flex flex-col items-center">
							<div
								className={`grid transition-[grid-template-rows] duration-200 ease-in-out w-[90vw] md:w-[32rem] ${
									isExpanded
										? "grid-rows-[1fr]"
										: "grid-rows-[0fr] group-hover:grid-rows-[1fr]"
								}`}
							>
								<div className="overflow-hidden">
									<div className="mt-4 mb-6 p-5 border border-border bg-background/80 backdrop-blur-md rounded-xl text-base md:text-lg font-normal text-muted-foreground text-left leading-relaxed mx-auto">
										<span className="font-semibold text-foreground">
											IntelliSense
										</span>{" "}
										is a general term for various code editing features
										including: code completion, parameter info, quick info, and
										member lists.
									</div>
								</div>
							</div>
						</div>
					</div>{" "}
					<br />
					Designed for
					<br />{" "}
					<div className="inline-flex flex-col items-center align-top group">
						<button
							type="button"
							onClick={() => setIsExpandedAgentic(!isExpandedAgentic)}
							className="bg-transparent p-0 underline decoration-dashed underline-offset-8 decoration-2 decoration-foreground/30 hover:decoration-primary cursor-help"
						>
							Coding Agent
						</button>
						<div className="w-0 flex flex-col items-center">
							<div
								className={`grid transition-[grid-template-rows] duration-200 ease-in-out w-[90vw] md:w-[32rem] ${
									isExpandedAgentic
										? "grid-rows-[1fr]"
										: "grid-rows-[0fr] group-hover:grid-rows-[1fr]"
								}`}
							>
								<div className="overflow-hidden">
									<div className="mt-4 mb-6 p-5 border border-border bg-background/80 backdrop-blur-md rounded-xl text-base md:text-lg font-normal text-muted-foreground text-left leading-relaxed mx-auto">
										<span className="font-semibold text-foreground">
											Coding Agent
										</span>{" "}
										is an AI system that can plan, write, debug, and refactor
										code autonomously.
									</div>
								</div>
							</div>
						</div>
					</div>
				</h1>

				{/* Description - From README */}
				<p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 font-light">
					Transforming the Language Server Protocol (LSP) into actionable
					intelligence for AI Agents and developers.
				</p>

				{/* Install Block - Opencode Style */}
				<div className="max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 w-full px-4 md:px-0">
					<div className="rounded-xl border border-border glass overflow-hidden text-left transition-all hover:border-primary/20">
						{/* Tabs */}
						<div className="flex border-b border-border bg-muted/40">
							{INSTALL_TARGETS.map((t) => (
								<button
									key={t.id}
									type="button"
									onClick={() => {
										setInstallTarget(t.id);
										setCopied(false);
									}}
									className={`px-6 py-3 text-sm font-medium transition-colors cursor-pointer ${
										t.id === installTarget
											? "border-b-2 border-primary bg-background text-foreground"
											: "text-muted-foreground hover:text-foreground"
									}`}
								>
									{t.label}
								</button>
							))}
						</div>

						{/* Command Area */}
						<div className="p-6 md:p-8 bg-background">
							<div className="flex items-center justify-between group">
								<code className="font-mono text-sm md:text-lg text-foreground break-all tracking-tight">
									{installCmd}
								</code>
								<Button
									variant="ghost"
									size="icon"
									onClick={copyCommand}
									className="ml-4 text-muted-foreground hover:text-foreground shrink-0 hover:bg-muted/50 rounded-lg h-10 w-10"
								>
									<Copy
										className={`h-5 w-5 ${copied ? "text-green-600" : ""}`}
									/>
								</Button>
							</div>
							{installTarget === "skill" ? (
								<div className="mt-3 text-xs text-muted-foreground">
									See{" "}
									<a
										href="https://github.com/numman-ali/openskills"
										target="_blank"
										rel="noreferrer"
										className="underline underline-offset-4 hover:text-foreground"
									>
										https://github.com/numman-ali/openskills
									</a>{" "}
									for OpenSkills documentation.
								</div>
							) : null}
						</div>
					</div>
				</div>

				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
					<Button
						size="xl"
						className="w-full sm:w-auto font-semibold text-lg px-10 border transition-all hover:-translate-y-0.5"
						asChild
					>
						<a href="#installation">
							Get Started <ArrowRight className="ml-2 h-5 w-5" />
						</a>
					</Button>
					<Button
						size="xl"
						variant="outline"
						className="w-full sm:w-auto font-semibold text-lg px-10 border-2 hover:bg-secondary transition-all hover:-translate-y-0.5"
						asChild
					>
						<a
							href="https://github.com/lsp-client/lsp-client"
							target="_blank"
							rel="noopener noreferrer"
						>
							View on GitHub
						</a>
					</Button>
				</div>
			</div>
		</section>
	);
}
