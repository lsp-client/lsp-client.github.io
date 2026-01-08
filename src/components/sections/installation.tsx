import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type ToolId = "claude-code" | "cursor" | "windsurf" | "vscode" | "zed";

interface ToolInstall {
	id: ToolId;
	name: string;
	detail: string;
	steps: string[];
	command: string;
}

const TOOLS: ToolInstall[] = [
	{
		id: "claude-code",
		name: "Claude Code",
		detail: "Install as a native plugin",
		steps: [
			"Open Claude Code in your project directory",
			"Run the /plugin add command with the repository URL",
			"Claude will automatically download and enable the skill",
		],
		command: "claude /plugin add https://github.com/lsp-client/lsp-skill",
	},
	{
		id: "cursor",
		name: "Cursor",
		detail: "Add to project-level skills directory",
		steps: [
			"Create a .cursor/skills directory in your project root",
			"Clone or copy the lsp-skill repository into that folder",
			"Cursor Agent will automatically detect and use the skill",
		],
		command:
			"mkdir -p .cursor/skills && git clone https://github.com/lsp-client/lsp-skill .cursor/skills/lsp-skill",
	},
	{
		id: "windsurf",
		name: "Windsurf",
		detail: "Install to global Windsurf skills directory",
		steps: [
			"Create the Windsurf skills directory if it doesn't exist",
			"Clone the lsp-skill repository into the global skills path",
			"Restart Windsurf to enable the new capabilities",
		],
		command:
			"mkdir -p ~/.codeium/windsurf/skills && git clone https://github.com/lsp-client/lsp-skill ~/.codeium/windsurf/skills/lsp-skill",
	},
	{
		id: "vscode",
		name: "VS Code",
		detail: "Install for Cline or Roo Code extensions",
		steps: [
			"Open your project in VS Code",
			"Install the skill into the .clinerules or custom instructions path",
			"The agent will pick up the new tools and protocols",
		],
		command:
			"mkdir -p .skills && git clone https://github.com/lsp-client/lsp-skill .skills/lsp-skill",
	},
	{
		id: "zed",
		name: "Zed",
		detail: "Install for Zed's integrated AI assistant",
		steps: [
			"Open your project in Zed",
			"Clone the skill into your project's local instructions directory",
			"The assistant will now have access to the LSP analysis tools",
		],
		command:
			"mkdir -p .zed/skills && git clone https://github.com/lsp-client/lsp-skill .zed/skills/lsp-skill",
	},
];

export function Installation() {
	const [selected, setSelected] = useState<ToolId>("claude-code");
	const [copied, setCopied] = useState(false);

	const tool = useMemo<ToolInstall>(
		() => TOOLS.find((t) => t.id === selected) ?? (TOOLS[0] as ToolInstall),
		[selected],
	);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(tool.command);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section className="py-32 relative z-10" id="installation">
			<div className="container px-4 md:px-6 mx-auto">
				<div className="max-w-3xl mb-12">
					<h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
						Installation
					</h2>
					<p className="text-muted-foreground text-xl leading-relaxed">
						Pick your AI coding tool and follow the tool-specific steps.
					</p>
				</div>

				<div className="flex flex-wrap items-center gap-2 mb-10">
					{TOOLS.map((t) => (
						<Button
							key={t.id}
							type="button"
							size="sm"
							variant={t.id === selected ? "default" : "secondary"}
							onClick={() => {
								setSelected(t.id);
								setCopied(false);
							}}
							className="rounded-full"
						>
							{t.name}
						</Button>
					))}
				</div>

				<div className="glass rounded-2xl border border-border p-6 md:p-8">
					<div className="flex items-start justify-between gap-6 flex-col md:flex-row">
						<div className="min-w-0">
							<div className="text-sm font-mono text-muted-foreground mb-2">
								{tool.name}
							</div>
							<div className="text-2xl font-display font-bold tracking-tight">
								{tool.detail}
							</div>
						</div>

						<Button
							type="button"
							variant="outline"
							className="rounded-full"
							onClick={copyToClipboard}
						>
							{copied ? (
								<>
									<Check className="size-4" />
									Copied
								</>
							) : (
								<>
									<Copy className="size-4" />
									Copy Command
								</>
							)}
						</Button>
					</div>

					<div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
						<div>
							<div className="text-sm font-semibold mb-3">Steps</div>
							<ul className="space-y-2">
								{tool.steps.map((s, idx) => (
									<li
										key={`${tool.id}-${idx}`}
										className="flex items-start gap-3"
									>
										<span className="mt-2 size-1.5 rounded-full bg-primary/60 shrink-0" />
										<span className="text-muted-foreground">{s}</span>
									</li>
								))}
							</ul>
						</div>

						<div>
							<div className="text-sm font-semibold mb-3">Command</div>
							<div className="rounded-2xl border border-border/70 bg-background/50 px-5 py-4">
								<code className="font-mono text-sm text-foreground break-all block select-all">
									{tool.command}
								</code>
							</div>
							<div className="text-xs text-muted-foreground mt-3">
								After running it, restart the tool to pick up the change.
							</div>
							<div className="text-xs text-muted-foreground mt-2">
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
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
