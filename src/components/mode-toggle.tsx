import { Moon, Sun } from "lucide-react";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

function ModeToggleButton() {
	const { theme, setTheme } = useTheme();

	const toggle = () => {
		const resolvedTheme =
			theme === "system"
				? window.matchMedia("(prefers-color-scheme: dark)").matches
					? "dark"
					: "light"
				: theme;
		const next = resolvedTheme === "light" ? "dark" : "light";

		setTheme(next);
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggle}
			className="rounded-full size-10 glass-light border-border/50 hover:glass transition-all duration-300 cursor-pointer"
		>
			<Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
			<Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}

export function ModeToggle() {
	return (
		<ThemeProvider>
			<ModeToggleButton />
		</ThemeProvider>
	);
}
