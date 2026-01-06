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

const INSTALL_CMD = "openskills add lsp-client/lsp-skill";

const TOOLS: ToolInstall[] = [
	{
		id: "claude-code",
		name: "Claude Code",
		detail: "Install and enable from your project directory",
		steps: [
			"Open your project folder (a git repo is recommended)",
			"Run the command below in Claude Code’s terminal",
			"Restart Claude Code to pick up the change",
		],
		command: INSTALL_CMD,
	},
	{
		id: "cursor",
		name: "Cursor",
		detail: "Install via the built-in terminal",
		steps: [
			"Open your project in Cursor",
			"Open Terminal (or the bottom panel) and run the command below",
			"Reload Window / restart Cursor to pick up the change",
		],
		command: INSTALL_CMD,
	},
	{
		id: "windsurf",
		name: "Windsurf",
		detail: "Install via the built-in terminal",
		steps: [
			"Open your project in Windsurf",
			"Run the command below in the built-in terminal",
			"Restart the app to pick up the change",
		],
		command: INSTALL_CMD,
	},
	{
		id: "vscode",
		name: "VS Code",
		detail: "Install via the integrated terminal",
		steps: [
			"Open your project in VS Code",
			"Run the command below in the integrated terminal",
			"Reload Window / restart VS Code",
		],
		command: INSTALL_CMD,
	},
	{
		id: "zed",
		name: "Zed",
		detail: "Install from the project terminal",
		steps: [
			"Open your project in Zed",
			"Open Terminal and run the command below",
			"Restart Zed to pick up the change",
		],
		command: INSTALL_CMD,
	},
];

export function Installation() {
	const [selected, setSelected] = useState<ToolId>("claude-code");
	const [copied, setCopied] = useState(false);

	const tool = useMemo<ToolInstall>(
		() => TOOLS.find((t) => t.id === selected) ?? TOOLS[0],
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
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
