import {
	Code2,
	FileSearch,
	GitGraph,
	Globe,
	ListTree,
	MousePointerClick,
	PenLine,
	Search,
} from "lucide-react";

export const CAPABILITIES = {
	Navigation: [
		{
			cmd: "Definition",
			desc: "Jump to precise definitions across files. Verify signatures without reading full implementation.",
			icon: Code2,
		},
		{
			cmd: "Reference",
			desc: "Find all usages and implementations workspace-wide. Understand impact before refactoring.",
			icon: GitGraph,
		},
		{
			cmd: "Hover",
			desc: "Access documentation and type signatures immediately without context switching.",
			icon: MousePointerClick,
		},
	],
	Analysis: [
		{
			cmd: "Outline",
			desc: "Get instant structural overview of classes and functions without reading the entire file.",
			icon: ListTree,
		},
		{
			cmd: "Search",
			desc: "Global symbol search with semantic filtering by type (class, function, interface).",
			icon: Globe,
		},
		{
			cmd: "Symbol",
			desc: "Locate and inspect symbols with precise coordinate information for anchoring operations.",
			icon: Search,
		},
	],
	Refactoring: [
		{
			cmd: "Rename",
			desc: "Perform safe, workspace-wide refactorings with a two-step preview and execute workflow.",
			icon: PenLine,
		},
		{
			cmd: "Locate",
			desc: "Verify symbol locations with flexible syntax before running semantic operations.",
			icon: FileSearch,
		},
	],
};
