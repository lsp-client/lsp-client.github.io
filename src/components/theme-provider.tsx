import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
	children: ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
	theme: "system",
	setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
	const [theme, setThemeState] = useState<Theme>(() => {
		if (typeof window === "undefined") return defaultTheme;
		try {
			const stored = window.localStorage.getItem(storageKey) as Theme | null;
			return stored ?? defaultTheme;
		} catch {
			return defaultTheme;
		}
	});

	useEffect(() => {
		const root = window.document.documentElement;

		const applyTheme = () => {
			root.classList.remove("light", "dark");

			if (theme === "system") {
				const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
					.matches
					? "dark"
					: "light";

				root.classList.add(systemTheme);
				return;
			}

			root.classList.add(theme);
		};

		applyTheme();

		if (theme !== "system") return;

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const listener = () => applyTheme();

		if ("addEventListener" in media) {
			media.addEventListener("change", listener);
		} else {
			// Fallback for legacy browsers (e.g. Safari < 14)
			const legacyMedia = media as unknown as {
				addListener: (l: () => void) => void;
				removeListener: (l: () => void) => void;
			};
			if (typeof legacyMedia.addListener === "function") {
				legacyMedia.addListener(listener);
			}
		}

		return () => {
			if ("removeEventListener" in media) {
				media.removeEventListener("change", listener);
			} else {
				const legacyMedia = media as unknown as {
					removeListener: (l: () => void) => void;
				};
				if (typeof legacyMedia.removeListener === "function") {
					legacyMedia.removeListener(listener);
				}
			}
		};
	}, [theme]);

	const value = useMemo<ThemeProviderState>(() => {
		const setTheme = (theme: Theme) => {
			try {
				window.localStorage.setItem(storageKey, theme);
			} catch {}
			setThemeState(theme);
		};

		return { theme, setTheme };
	}, [storageKey, theme]);

	return (
		<ThemeProviderContext.Provider value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);
	return context;
};
