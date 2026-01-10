import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type ToolId =
	| "prompt"
	| "universal"
	| "opencode"
	| "claude-code"
	| "gemini"
	| "codex";

interface ToolInstall {
	id: ToolId;
	name: string;
	detail: string;
	steps: string[];
	command: string;
}

const TOOLS: ToolInstall[] = [
	{
		id: "prompt",
		name: "AI Agent (Prompt)",
		detail: "Prompt-based installation",
		steps: [
			"Copy the installation prompt below",
			"Paste it into your AI agent's chat (Claude Code, Gemini, etc.)",
			"The agent will automatically determine the path and install the skill",
		],
		command: `Please follow these steps to install this skill:

1. Identify what AI agent tool you are (e.g., Claude Code, Gemini, Codex, OpenCode, etc.).
2. Determine the correct installation directory for your tool:
   - Claude Code: ~/.claude/skills/
   - Gemini: ~/.gemini/skills/
   - Codex: ~/.codex/skills/
   - OpenCode: ~/.config/opencode/skill/
3. Run the installation script:
   bash <(curl -sSL https://raw.githubusercontent.com/lsp-client/lsp-skill/main/scripts/install.sh) <absolute_path_to_skill_directory>`,
	},
	{
		id: "universal",
		name: "OpenSkills",
		detail: "Install via OpenSkills CLI",
		steps: [
			"Install OpenSkills CLI if you haven't already",
			"Run the install command in your terminal",
			"The skill will be installed globally for all compatible agents",
		],
		command: "openskills install lsp-client/lsp-skill --global",
	},
	{
		id: "opencode",
		name: "OpenCode",
		detail: "Install for OpenCode",
		steps: [
			"Ensure OpenCode is installed and configured",
			"Run the installation script with the OpenCode skill path",
			"Restart OpenCode to load the new skill",
		],
		command:
			"bash <(curl -sSL https://raw.githubusercontent.com/lsp-client/lsp-skill/main/scripts/install.sh) ~/.config/opencode/skill/lsp-code-analysis",
	},
	{
		id: "claude-code",
		name: "Claude Code",
		detail: "Install for Claude Code",
		steps: [
			"Ensure Claude Code is installed",
			"Run the installation script with the Claude Code skill path",
			"The skill will be available in your next Claude session",
		],
		command:
			"bash <(curl -sSL https://raw.githubusercontent.com/lsp-client/lsp-skill/main/scripts/install.sh) ~/.claude/skills/lsp-code-analysis",
	},
	{
		id: "gemini",
		name: "Gemini",
		detail: "Install for Gemini",
		steps: [
			"Open your terminal",
			"Run the installation script with the Gemini skill path",
			"Gemini will now be able to use LSP for code analysis",
		],
		command:
			"bash <(curl -sSL https://raw.githubusercontent.com/lsp-client/lsp-skill/main/scripts/install.sh) ~/.gemini/skills/lsp-code-analysis",
	},
	{
		id: "codex",
		name: "Codex",
		detail: "Install for Codex",
		steps: [
			"Open your terminal",
			"Run the installation script with the Codex skill path",
			"Codex will gain advanced code understanding capabilities",
		],
		command:
			"bash <(curl -sSL https://raw.githubusercontent.com/lsp-client/lsp-skill/main/scripts/install.sh) ~/.codex/skills/lsp-code-analysis",
	},
];

export function Installation() {
	const [selected, setSelected] = useState<ToolId>("prompt");
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
							<h3 className="text-2xl font-display font-bold tracking-tight">
								{tool.detail}
							</h3>
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
							<h4 className="text-sm font-semibold mb-3">Steps</h4>
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
							<h4 className="text-sm font-semibold mb-3">Command</h4>
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
