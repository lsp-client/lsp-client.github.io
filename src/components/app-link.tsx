import type { ComponentProps } from "react";
import { navigate } from "@/lib/router";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"a">;

export function AppLink({ href, className, onClick, ...props }: Props) {
	const handleClick: NonNullable<Props["onClick"]> = (event) => {
		onClick?.(event);
		if (event.defaultPrevented) return;
		if (event.button !== 0) return;
		if (props.target && props.target !== "_self") return;
		if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
			return;
		if (!href || !href.startsWith("/")) return;

		event.preventDefault();
		navigate(href);
		if (!href.includes("#")) window.scrollTo({ top: 0, left: 0 });
	};

	return (
		<a href={href} className={cn(className)} onClick={handleClick} {...props} />
	);
}
