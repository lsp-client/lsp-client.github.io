import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"a">;

export function AppLink({ className, ...props }: Props) {
	return <a className={cn(className)} {...props} />;
}
