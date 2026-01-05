import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const themeApi =
    typeof useTheme === "function"
      ? useTheme()
      : { theme: "light", setTheme: () => {} };
  const theme = themeApi?.theme ?? "light";
  const setThemeFn = themeApi?.setTheme ?? ((_: any) => {});
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    try {
      setThemeFn(next);
    } finally {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(next);
      try {
        localStorage.setItem("lsp-client-theme", next);
      } catch {}
    }
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
