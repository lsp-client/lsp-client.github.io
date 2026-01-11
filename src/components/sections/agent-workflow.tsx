import { Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CAPABILITIES } from "@/components/sections/capabilities-data";
import { cn } from "@/lib/utils";

// Claude Code colors & Theme
const THEME = {
	bg: "bg-[#1c1c1c]",
	text: "text-[#D4D4D4]",
	orange: "text-[#D97757]",
	border: "border-[#333333]",
	caret:
		"after:content-['▋'] after:animate-pulse after:ml-1 after:text-[#D97757]",
};

export function AgentWorkflow() {
	const [mode, setMode] = useState<"find-usages" | "refactor" | "explain">(
		"find-usages",
	);
	const [step, setStep] = useState(0);
	const [typedText, setTypedText] = useState("");
	const [executeTypedText, setExecuteTypedText] = useState("");
	const scrollRef = useRef<HTMLDivElement>(null);
	const isSkippedRef = useRef(false);

	const handleSkip = () => {
		isSkippedRef.current = true;
		const isRefactor = mode === "refactor";
		setStep(isRefactor ? 7 : 4);
		setTypedText(MODES[mode].input);
		if (isRefactor && "execute" in MODES.refactor) {
			setExecuteTypedText(MODES.refactor.execute.input);
		}
	};

	const MODES = {
		"find-usages": {
			label: "Find Usages",
			input: "find usages of User.validate",
			thinking:
				"I need to find all usages of `User.validate` to understand how it's being used across the repository.",
			tool: {
				name: "lsap.search",
				code: `call lsap.search({
  locate: {
    file_path: "src/models.py",
    locate: "User.validate"
  },
  mode: "references",
  max_items: 2
})`,
			},
			result: {
				icon: (
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<title>Success</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
				),
				text: "Total references: 12 | Showing: 2",
			},
		},
		refactor: {
			label: "Refactor",
			input: "rename User.validate to validate_data",
			thinking:
				"I'll generate a rename preview to see how `User.validate` usage will be updated across the codebase.",
			tool: {
				name: "lsap.rename",
				code: `call lsap.rename({
  locate: {
    file_path: "src/models.py",
    locate: "User.validate"
  },
  new_name: "validate_data",
  mode: "rename_preview"
})`,
			},
			result: {
				icon: (
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<title>Refactor</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
						/>
					</svg>
				),
				text: "Rename Preview: Affects 3 files and 8 occurrences",
			},
			execute: {
				input: "apply rename",
				tool: {
					name: "lsap.rename",
					code: `call lsap.rename({
  rename_id: "abc123",
  exclude_files: ["tests/**"],
  mode: "rename_execute"
})`,
				},
				result: {
					icon: (
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Success</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					),
					text: "Rename Applied: Modified 3 files",
				},
			},
		},
		explain: {
			label: "File Outline",
			input: "outline src/models.py",
			thinking:
				"I need to understand the class structure and methods defined in `src/models.py`.",
			tool: {
				name: "lsap.outline",
				code: `call lsap.outline({
  file_path: "src/models.py",
  mode: "outline"
})`,
			},
			result: {
				icon: (
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<title>Info</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				),
				text: "Found 2 classes and 3 methods",
			},
		},
	};

	const modeKeys = Object.keys(MODES) as Array<keyof typeof MODES>;

	// Animation sequence
	useEffect(() => {
		let isMounted = true;
		isSkippedRef.current = false;
		setStep(0);
		setTypedText("");
		setExecuteTypedText("");

		const runSequence = async () => {
			if (!isMounted) return;

			// Step 0: Initial state (just welcome)
			await new Promise((r) => setTimeout(r, 500));
			if (!isMounted || isSkippedRef.current) return;
			setStep(1); // Start typing

			// Step 1: Type user input
			const text = MODES[mode].input;
			for (let i = 0; i <= text.length; i++) {
				if (!isMounted || isSkippedRef.current) return;
				setTypedText(text.slice(0, i));
				await new Promise((r) => setTimeout(r, 30 + Math.random() * 30));
			}
			await new Promise((r) => setTimeout(r, 300));
			if (!isMounted || isSkippedRef.current) return;
			setStep(2); // Enter pressed, Thinking start

			// Step 2: Simmering...
			await new Promise((r) => setTimeout(r, 1200));
			if (!isMounted || isSkippedRef.current) return;
			setStep(3); // Tool Call

			// Step 3: Tool Call Result
			await new Promise((r) => setTimeout(r, 1200));
			if (!isMounted || isSkippedRef.current) return;
			setStep(4); // Final Result

			// Handle Execution Phase for Refactor
			if (mode === "refactor" && "execute" in MODES.refactor) {
				await new Promise((r) => setTimeout(r, 1000));
				if (!isMounted || isSkippedRef.current) return;
				setStep(5); // Start typing execute command

				const execText = MODES.refactor.execute.input;
				for (let i = 0; i <= execText.length; i++) {
					if (!isMounted || isSkippedRef.current) return;
					setExecuteTypedText(execText.slice(0, i));
					await new Promise((r) => setTimeout(r, 30 + Math.random() * 30));
				}
				await new Promise((r) => setTimeout(r, 300));
				if (!isMounted || isSkippedRef.current) return;
				setStep(6); // Tool Call (Execute)

				await new Promise((r) => setTimeout(r, 1200));
				if (!isMounted || isSkippedRef.current) return;
				setStep(7); // Final Result (Execute)
			}
		};

		runSequence();

		return () => {
			isMounted = false;
		};
	}, [mode]);

	// Auto scroll to bottom
	useEffect(() => {
		if (scrollRef.current) {
			const isTyping = step === 1 || step === 5;
			scrollRef.current.scrollTo({
				top: scrollRef.current.scrollHeight,
				behavior: isTyping ? "auto" : "smooth",
			});
		}
	}, [step]);

	return (
		<section className="py-24 bg-background relative overflow-hidden">
			{/* Background Decoration */}
			<div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

			<div className="container px-4 md:px-6 mx-auto">
				<div className="mb-12 text-center">
					<h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter text-foreground mb-4">
						Repository-Scale Intelligence
					</h2>
					<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
						See how Coding Agents use LSP to understand your codebase in
						seconds.
					</p>
				</div>

				<div className="max-w-4xl mx-auto">
					<div className="rounded-xl overflow-hidden shadow-2xl border border-border bg-[#1c1c1c] font-mono text-sm md:text-base relative group">
						{/* Window Controls */}
						<div className="flex flex-col gap-3 px-4 py-3 bg-[#2a2a2a] border-b border-[#333333]">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
									<div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
									<div className="w-3 h-3 rounded-full bg-[#27c93f]" />
									<div className="ml-2 text-xs text-muted-foreground/50 select-none">
										Claude Code — LSAP Agent
									</div>
								</div>
								<button
									type="button"
									onClick={handleSkip}
									className="text-xs text-muted-foreground hover:text-[#D4D4D4] transition-colors px-2 py-1 rounded hover:bg-[#333333] cursor-pointer"
								>
									Skip
								</button>
							</div>

							<div
								role="tablist"
								aria-label="Agent workflow modes"
								className="relative grid grid-cols-3 items-stretch p-1 rounded-lg border border-[#333333] bg-[#1c1c1c] overflow-hidden"
							>
								<div
									aria-hidden="true"
									className="absolute inset-y-1 left-1 rounded-md bg-[#2a2a2a] shadow-sm border border-[#333333] transition-transform duration-300 ease-out"
									style={{
										width: "calc((100% - 0.5rem) / 3)",
										transform: `translateX(${Math.max(0, modeKeys.indexOf(mode)) * 100}%)`,
									}}
								/>
								{modeKeys.map((m) => (
									<div
										key={m}
										role="tab"
										tabIndex={mode === m ? 0 : -1}
										aria-selected={mode === m}
										onClick={() => setMode(m)}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												e.preventDefault();
												setMode(m);
												return;
											}

											if (e.key !== "ArrowLeft" && e.key !== "ArrowRight")
												return;
											e.preventDefault();

											const currentIndex = modeKeys.indexOf(m);
											const delta = e.key === "ArrowLeft" ? -1 : 1;
											const nextIndex =
												(currentIndex + delta + modeKeys.length) %
												modeKeys.length;
											const nextMode = modeKeys[nextIndex];
											if (!nextMode) return;
											setMode(nextMode);
										}}
										className={`relative z-10 flex items-center justify-center px-2 py-2 rounded-md select-none cursor-pointer outline-none transition-colors duration-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-[#D97757]/40 ${
											mode === m
												? "text-[#D4D4D4]"
												: "text-muted-foreground hover:text-[#D4D4D4]"
										}`}
									>
										{MODES[m].label}
									</div>
								))}
							</div>
						</div>

						{/* Terminal Content */}
						<div
							ref={scrollRef}
							className="p-6 h-[500px] overflow-y-auto text-[#D4D4D4] space-y-6"
						>
							{/* Header */}
							<div className="mb-6 animate-in fade-in duration-700">
								<span className={THEME.orange}>*</span> Welcome to Claude Code!
							</div>

							{/* Interaction Loop */}
							<div className="space-y-6">
								{mode === "refactor" && (
									<div className="flex items-center gap-2 text-xs font-bold tracking-wider text-muted-foreground uppercase pt-2">
										<div className="h-px bg-[#333333] flex-1" />
										Preview Phase
										<div className="h-px bg-[#333333] flex-1" />
									</div>
								)}

								{/* User Input Area */}
								{step >= 1 && (
									<div className="space-y-2">
										<div className="border border-[#333333] rounded-lg p-4 bg-[#1c1c1c] relative">
											<div className="flex gap-2">
												<span className="text-muted-foreground select-none">
													{">"}
												</span>
												<span className={step === 1 ? THEME.caret : ""}>
													{typedText}
												</span>
											</div>
										</div>
									</div>
								)}

								{/* Simmering / Thinking */}
								{step >= 2 && (
									<div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-2">
										<div className={`${THEME.orange} flex items-center gap-2`}>
											<span>*</span>
											<span>Simmering...</span>
										</div>
										<div className="pl-4 border-l-2 border-[#333333] text-muted-foreground italic">
											{MODES[mode].thinking}
										</div>
									</div>
								)}

								{/* Tool Call */}
								{step >= 3 && (
									<div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
										<div className="bg-[#2a2a2a] rounded-lg p-4 border border-[#333333] relative overflow-hidden">
											<div className="absolute top-0 right-0 p-2 opacity-10">
												<svg
													aria-hidden="true"
													width="100"
													height="100"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="1"
												>
													<title>Tool execution</title>
													<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
												</svg>
											</div>
											<div className="flex justify-between items-center mb-2 text-xs text-muted-foreground uppercase tracking-wider">
												<span>Tool Execution</span>
												<span>{MODES[mode].tool.name}</span>
											</div>
											<code className="text-[#a5b3ce] text-sm block">
												<span className="text-[#c678dd]">call</span>{" "}
												{MODES[mode].tool.name}({"{"}
												{mode === "find-usages" && (
													<>
														<br />
														&nbsp;&nbsp;locate: {"{"}
														<br />
														&nbsp;&nbsp;&nbsp;&nbsp;file_path:{" "}
														<span className="text-[#98c379]">
															"src/models.py"
														</span>
														,
														<br />
														&nbsp;&nbsp;&nbsp;&nbsp;locate:{" "}
														<span className="text-[#98c379]">
															"User.validate"
														</span>
														<br />
														&nbsp;&nbsp;{"}"},
														<br />
														&nbsp;&nbsp;mode:{" "}
														<span className="text-[#98c379]">"references"</span>
														,
														<br />
														&nbsp;&nbsp;max_items:{" "}
														<span className="text-[#d19a66]">2</span>
													</>
												)}
												{mode === "refactor" && (
													<>
														<br />
														&nbsp;&nbsp;locate: {"{"}
														<br />
														&nbsp;&nbsp;&nbsp;&nbsp;file_path:{" "}
														<span className="text-[#98c379]">
															"src/models.py"
														</span>
														,
														<br />
														&nbsp;&nbsp;&nbsp;&nbsp;locate:{" "}
														<span className="text-[#98c379]">
															"User.validate"
														</span>
														<br />
														&nbsp;&nbsp;{"}"},
														<br />
														&nbsp;&nbsp;new_name:{" "}
														<span className="text-[#98c379]">
															"validate_data"
														</span>
														,
														<br />
														&nbsp;&nbsp;mode:{" "}
														<span className="text-[#98c379]">
															"rename_preview"
														</span>
													</>
												)}
												{mode === "explain" && (
													<>
														<br />
														&nbsp;&nbsp;file_path:{" "}
														<span className="text-[#98c379]">
															"src/models.py"
														</span>
														,
														<br />
														&nbsp;&nbsp;mode:{" "}
														<span className="text-[#98c379]">"outline"</span>
													</>
												)}
												<br />
												{"}"})
											</code>
										</div>
									</div>
								)}

								{/* Result */}
								{step >= 4 && (
									<div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pb-4">
										<div className="space-y-3">
											<div className="text-green-500 flex items-center gap-2">
												{MODES[mode].result.icon}
												{MODES[mode].result.text}
											</div>
											<div className="bg-[#1c1c1c] p-4 rounded border border-[#333333] text-sm font-normal">
												{mode === "find-usages" && (
													<div className="space-y-4">
														<div>
															<div className="text-[#61afef] mb-1 flex items-center gap-2">
																<span className="text-muted-foreground">
																	📄
																</span>
																src/auth/login.py:45
															</div>
															<div className="pl-5 border-l-2 border-[#333333] opacity-80">
																<div className="mb-1 text-xs text-muted-foreground">
																	In{" "}
																	<span className="text-[#e5c07b]">
																		LoginHandler.authenticate
																	</span>{" "}
																	(Method)
																</div>
																<div className="font-mono text-xs md:text-sm overflow-x-auto mt-2">
																	<div className="flex text-[#a5b3ce]">
																		<span className="w-6 text-right mr-3 select-none opacity-50">
																			44
																		</span>
																		<span> def authenticate(credentials):</span>
																	</div>
																	<div className="flex bg-[#2c2c2c] -mx-4 px-4 py-0.5 text-[#98c379]">
																		<span className="w-6 text-right mr-3 select-none opacity-50 text-muted-foreground">
																			45
																		</span>
																		<span>
																			{" "}
																			&nbsp;&nbsp;&nbsp;&nbsp;if not
																			User.validate(credentials):
																		</span>
																	</div>
																	<div className="flex text-[#a5b3ce]">
																		<span className="w-6 text-right mr-3 select-none opacity-50">
																			46
																		</span>
																		<span>
																			{" "}
																			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;raise
																			AuthError()
																		</span>
																	</div>
																</div>
															</div>
														</div>
														<div>
															<div className="text-[#61afef] mb-1 flex items-center gap-2">
																<span className="text-muted-foreground">
																	📄
																</span>
																src/api/register.py:28
															</div>
															<div className="pl-5 border-l-2 border-[#333333] opacity-80">
																<div className="mb-1 text-xs text-muted-foreground">
																	In{" "}
																	<span className="text-[#e5c07b]">
																		register_user
																	</span>{" "}
																	(Function)
																</div>
																<div className="font-mono text-xs md:text-sm overflow-x-auto mt-2">
																	<div className="flex text-[#a5b3ce]">
																		<span className="w-6 text-right mr-3 select-none opacity-50">
																			27
																		</span>
																		<span>
																			{" "}
																			def register_user(new_user_data):
																		</span>
																	</div>
																	<div className="flex bg-[#2c2c2c] -mx-4 px-4 py-0.5 text-[#98c379]">
																		<span className="w-6 text-right mr-3 select-none opacity-50 text-muted-foreground">
																			28
																		</span>
																		<span>
																			{" "}
																			&nbsp;&nbsp;&nbsp;&nbsp;User.validate(new_user_data)
																		</span>
																	</div>
																	<div className="flex text-[#a5b3ce]">
																		<span className="w-6 text-right mr-3 select-none opacity-50">
																			29
																		</span>
																		<span>
																			{" "}
																			&nbsp;&nbsp;&nbsp;&nbsp;db.save(new_user_data)
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												)}

												{mode === "refactor" && (
													<div className="space-y-4">
														<div>
															<div className="text-[#61afef] mb-1 flex items-center gap-2">
																<span className="text-muted-foreground">
																	📄
																</span>
																src/models.py
															</div>
															<div className="pl-5 border-l-2 border-[#333333] opacity-80">
																<div className="mb-1 text-xs text-muted-foreground">
																	Line 15
																</div>
																<div className="font-mono text-xs md:text-sm overflow-x-auto mt-2">
																	<div className="flex bg-red-500/10 -mx-4 px-4 py-0.5 text-red-400">
																		<span className="w-6 text-right mr-3 select-none opacity-50">
																			-
																		</span>
																		<span>
																			{" "}
																			def validate(data: dict) -{">"} bool:
																		</span>
																	</div>
																	<div className="flex bg-green-500/10 -mx-4 px-4 py-0.5 text-green-400">
																		<span className="w-6 text-right mr-3 select-none opacity-50">
																			+
																		</span>
																		<span>
																			{" "}
																			def validate_data(data: dict) -{">"} bool:
																		</span>
																	</div>
																</div>
															</div>
														</div>
														<div>
															<div className="text-[#61afef] mb-1 flex items-center gap-2">
																<span className="text-muted-foreground">
																	📄
																</span>
																src/auth/login.py
															</div>
															<div className="pl-5 border-l-2 border-[#333333] opacity-80">
																<div className="mb-1 text-xs text-muted-foreground">
																	Line 45
																</div>
																<div className="font-mono text-xs md:text-sm overflow-x-auto mt-2">
																	<div className="flex bg-red-500/10 -mx-4 px-4 py-0.5 text-red-400">
																		<span className="w-6 text-right mr-3 select-none opacity-50">
																			-
																		</span>
																		<span>
																			{" "}
																			if not User.validate(credentials):
																		</span>
																	</div>
																	<div className="flex bg-green-500/10 -mx-4 px-4 py-0.5 text-green-400">
																		<span className="w-6 text-right mr-3 select-none opacity-50">
																			+
																		</span>
																		<span>
																			{" "}
																			if not User.validate_data(credentials):
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
												)}

												{mode === "explain" && (
													<div className="space-y-4">
														<div className="text-[#61afef] mb-3 text-lg font-medium">
															Outline for `src/models.py`
														</div>

														<div className="space-y-4">
															<div>
																<div className="flex items-center gap-2 text-[#e5c07b] font-medium mb-2">
																	<span className="text-muted-foreground text-xs uppercase tracking-wider border border-[#333333] px-1.5 py-0.5 rounded">
																		class
																	</span>
																	User
																</div>
																<div className="pl-4 space-y-3 border-l border-[#333333]">
																	<div>
																		<div className="flex items-center gap-2 text-[#61afef] text-sm mb-1">
																			<span className="text-muted-foreground text-[10px] uppercase tracking-wider">
																				method
																			</span>
																			User.validate
																		</div>
																		<div className="font-mono text-xs text-[#a5b3ce] bg-[#2a2a2a] px-2 py-1 rounded inline-block">
																			def validate(data: dict) -{">"} bool
																		</div>
																		<div className="mt-1 text-xs text-muted-foreground">
																			Validate user data before saving.
																		</div>
																	</div>
																	<div>
																		<div className="flex items-center gap-2 text-[#61afef] text-sm mb-1">
																			<span className="text-muted-foreground text-[10px] uppercase tracking-wider">
																				method
																			</span>
																			User.save
																		</div>
																		<div className="font-mono text-xs text-[#a5b3ce] bg-[#2a2a2a] px-2 py-1 rounded inline-block">
																			async def save(self) -{">"} None
																		</div>
																	</div>
																</div>
															</div>

															<div>
																<div className="flex items-center gap-2 text-[#e5c07b] font-medium mb-2">
																	<span className="text-muted-foreground text-xs uppercase tracking-wider border border-[#333333] px-1.5 py-0.5 rounded">
																		class
																	</span>
																	Post
																</div>
																<div className="pl-4 space-y-3 border-l border-[#333333]">
																	<div>
																		<div className="flex items-center gap-2 text-[#61afef] text-sm mb-1">
																			<span className="text-muted-foreground text-[10px] uppercase tracking-wider">
																				method
																			</span>
																			Post.publish
																		</div>
																		<div className="font-mono text-xs text-[#a5b3ce] bg-[#2a2a2a] px-2 py-1 rounded inline-block">
																			async def publish(self) -{">"}{" "}
																			PublishResult
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												)}
											</div>
										</div>
									</div>
								)}

								{/* Execution Phase for Refactor */}
								{mode === "refactor" && step >= 5 && (
									<>
										<div className="flex items-center gap-2 text-xs font-bold tracking-wider text-muted-foreground uppercase pt-4">
											<div className="h-px bg-[#333333] flex-1" />
											Execute Phase
											<div className="h-px bg-[#333333] flex-1" />
										</div>

										<div className="space-y-2">
											<div className="border border-[#333333] rounded-lg p-4 bg-[#1c1c1c] relative">
												<div className="flex gap-2">
													<span className="text-muted-foreground select-none">
														{">"}
													</span>
													<span className={step === 5 ? THEME.caret : ""}>
														{executeTypedText}
													</span>
												</div>
											</div>
										</div>
									</>
								)}

								{/* Execute Tool Call */}
								{mode === "refactor" && step >= 6 && (
									<div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
										<div className="bg-[#2a2a2a] rounded-lg p-4 border border-[#333333] relative overflow-hidden">
											<div className="absolute top-0 right-0 p-2 opacity-10">
												<svg
													aria-hidden="true"
													width="100"
													height="100"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="1"
												>
													<title>Tool execution</title>
													<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
												</svg>
											</div>
											<div className="flex justify-between items-center mb-2 text-xs text-muted-foreground uppercase tracking-wider">
												<span>Tool Execution</span>
												<span>
													{/* @ts-ignore */}
													{MODES[mode].execute?.tool.name}
												</span>
											</div>
											<code className="text-[#a5b3ce] text-sm block">
												<span className="text-[#c678dd]">call</span>{" "}
												{/* @ts-ignore */}
												{MODES[mode].execute?.tool.name}({"{"}
												<br />
												&nbsp;&nbsp;rename_id:{" "}
												<span className="text-[#98c379]">"abc123"</span>,
												<br />
												&nbsp;&nbsp;exclude_files: [
												<span className="text-[#98c379]">"tests/**"</span>],
												<br />
												&nbsp;&nbsp;mode:{" "}
												<span className="text-[#98c379]">"rename_execute"</span>
												<br />
												{"}"})
											</code>
										</div>
									</div>
								)}

								{/* Execute Result */}
								{mode === "refactor" && step >= 7 && (
									<div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pb-4">
										<div className="space-y-3">
											<div className="text-green-500 flex items-center gap-2">
												{/* @ts-ignore */}
												{MODES[mode].execute?.result.icon}
												{/* @ts-ignore */}
												{MODES[mode].execute?.result.text}
											</div>
											<div className="bg-[#1c1c1c] p-4 rounded border border-[#333333] text-sm font-normal">
												<div className="space-y-2">
													<div>
														Summary: Modified 3 files with 8 occurrences.
													</div>
													<ul className="list-disc list-inside text-muted-foreground">
														<li>`src/models.py`: 1 occurrence</li>
														<li>`src/auth/login.py`: 4 occurrences</li>
														<li>`src/api/register.py`: 3 occurrences</li>
													</ul>
													<div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400 text-xs">
														<strong>Note:</strong> Rename completed
														successfully. Excluded files: `tests/**`.
													</div>
													<div className="mt-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-400 text-xs">
														<strong>IMPORTANT:</strong> You must manually rename
														the symbol in the excluded files to maintain
														consistency.
													</div>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container px-4 md:px-6 mx-auto mt-10">
				<div className="max-w-4xl mx-auto">
					<div className="rounded-lg border border-border bg-background/60 p-4 md:p-6">
						<div className="mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-2">
							<span className="w-8 h-px bg-border" />
							Capabilities Snapshot
							<span className="flex-1 h-px bg-border" />
						</div>
						<CapabilitiesList />
					</div>
				</div>
			</div>
		</section>
	);
}

function CapabilitiesList() {
	const categories = useMemo(() => Object.entries(CAPABILITIES), []);
	const [expanded, setExpanded] = useState<Set<string>>(
		new Set([categories[0]?.[0] ?? ""]),
	);

	const visible = categories;

	const toggle = (cat: string) => {
		setExpanded((prev) => {
			const next = new Set(prev);
			if (next.has(cat)) next.delete(cat);
			else next.add(cat);
			return next;
		});
	};

	return (
		<div className="space-y-3">
			<div className="mb-3 flex items-center justify-end gap-4">
				<button
					type="button"
					className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-sm px-1 py-0.5"
					onClick={() => setExpanded(new Set(categories.map(([cat]) => cat)))}
				>
					Expand All
				</button>
				<button
					type="button"
					className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-sm px-1 py-0.5"
					onClick={() => setExpanded(new Set())}
				>
					Collapse All
				</button>
			</div>
			{visible.map(([category, items]) => {
				const isOpen = expanded.has(category);
				return (
					<div key={category} className="border border-border/50 rounded-lg">
						<button
							type="button"
							className={cn(
								"w-full px-3 py-2 flex items-center justify-between cursor-pointer",
								"hover:bg-muted/40 transition-colors",
							)}
							onClick={() => toggle(category)}
							aria-expanded={isOpen}
						>
							<div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
								{category}
							</div>
							<div className="flex items-center gap-3 text-[10px] text-muted-foreground">
								<span>{items.length} items</span>
								<span
									className={cn(
										"inline-block transition-transform duration-100",
										isOpen ? "rotate-180" : "rotate-0",
									)}
									aria-hidden="true"
								>
									▾
								</span>
							</div>
						</button>
						<div
							className={cn(
								"grid grid-rows-[0fr] transition-[grid-template-rows] duration-100 ease-out",
								isOpen && "grid-rows-[1fr]",
							)}
						>
							<div className="overflow-hidden">
								<div
									className={cn(
										"opacity-0 transition-opacity duration-100 ease-out",
										isOpen && "opacity-100",
									)}
								>
									<div className="px-3 pb-3">
										<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
											{items.map((item) => (
												<div
													key={item.cmd}
													className="flex items-start gap-3 rounded-md border border-border/50 bg-muted/40 px-3 py-2"
												>
													<div className="p-1.5 rounded-md bg-muted text-primary">
														<item.icon className="w-4 h-4" />
													</div>
													<div className="min-w-0">
														<div className="font-mono text-sm">{item.cmd}</div>
														<div className="text-[11px] text-muted-foreground leading-snug">
															{item.desc}
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
			<div className="mt-3 rounded-lg border border-border bg-muted/30 p-4">
				<div className="flex items-center justify-center gap-3">
					<div className="p-2 rounded-md text-primary">
						<Sparkles className="w-4 h-4" />
					</div>
					<div className="text-center">
						<div className="text-sm font-semibold text-foreground">
							More Capabilities Coming Soon
						</div>
						<div className="text-xs text-muted-foreground">
							Continuous expansion of repository-scale intelligence.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
