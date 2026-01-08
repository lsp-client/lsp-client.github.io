import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type ToolId = "universal" | "opencode" | "claude-code" | "cursor" | "vscode";

interface ToolInstall {
	id: ToolId;
	name: string;
	detail: string;
	steps: string[];
	command: string;
}

const TOOLS: ToolInstall[] = [
	{
		id: "universal",
		name: "Universal (Recommended)",
		detail: "Install using OpenSkills CLI",
		steps: [
			"Install OpenSkills CLI via npm",
			"Open your project directory",
			"Install the LSP skill using openskills",
		],
		command:
			"npm install -g openskills && openskills install lsp-client/lsp-skill",
	},
	{
		id: "opencode",
		name: "OpenCode",
		detail: "Install as a local skill",
		steps: [
			"Open your project directory",
			"Download and extract the skill to .opencode/skill",
			"Restart OpenCode to load the new skill",
		],
		command:
			"mkdir -p .opencode/skill/lsp-code-analysis && curl -L https://github.com/lsp-client/lsp-skill/releases/latest/download/lsp-code-analysis.zip -o lsp.zip && unzip lsp.zip -d .opencode/skill/lsp-code-analysis && rm lsp.zip",
	},
	{
		id: "claude-code",
		name: "Claude Code",
		detail: "Install as a native plugin",
		steps: [
			"Run Claude Code in your project directory",
			"Execute /plugin marketplace add lsp-client/lsp-skill",
			"Execute /plugin install lsp-code-analysis@lsp-skill",
		],
		command: `/plugin marketplace add lsp-client/lsp-skill
/plugin install lsp-code-analysis@lsp-skill`,
	},
	{
		id: "cursor",
		name: "Cursor",
		detail: "Requires Nightly Build & Agent Skills Enabled",
		steps: [
			"Switch to Nightly build in Settings > General",
			"Enable 'Agent Skills' in Settings > Beta",
			"Extract the skill to .cursor/skills in your project",
		],
		command:
			"mkdir -p .cursor/skills/lsp-code-analysis && curl -L https://github.com/lsp-client/lsp-skill/releases/latest/download/lsp-code-analysis.zip -o lsp.zip && unzip lsp.zip -d .cursor/skills/lsp-code-analysis && rm lsp.zip",
	},
	{
		id: "vscode",
		name: "VS Code",
		detail: "Install for Cline or Roo Code extensions",
		steps: [
			"Open your project directory",
			"Download and extract the skill to .skills/lsp-code-analysis",
			"Configure your agent to use the new skill",
		],
		command:
			"mkdir -p .skills/lsp-code-analysis && curl -L https://github.com/lsp-client/lsp-skill/releases/latest/download/lsp-code-analysis.zip -o lsp.zip && unzip lsp.zip -d .skills/lsp-code-analysis && rm lsp.zip",
	},
];

export function Installation() {
	const [selected, setSelected] = useState<ToolId>("universal");
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
								<code className="font-mono text-sm text-foreground block select-all whitespace-pre-wrap">
									{tool.command}
								</code>
							</div>
							<div className="text-xs text-muted-foreground mt-3">
								After running it, you may need to restart the tool to pick up
								the change.
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
