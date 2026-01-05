export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "code"; language?: string; code: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  readingMinutes: number;
  blocks: BlogBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-lsp-for-agents",
    title: "Why LSP is a Great Substrate for Coding Agents",
    description:
      "From symbol graphs to semantic navigation: what agents get “for free” with LSP.",
    publishedAt: "2026-01-05",
    tags: ["LSP", "Agents", "Architecture"],
    readingMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Coding agents need stable, structured signals. LSP already defines a battle-tested contract for “where things are” (definitions, references), “what things are” (hover/type), and “how to change them safely” (workspace edits).",
      },
      {
        type: "quote",
        text: "A good agent loop is just search → inspect → decide → edit → verify. LSP accelerates the first two steps with semantic primitives.",
      },
      {
        type: "h2",
        text: "What you get immediately",
      },
      {
        type: "ul",
        items: [
          "Symbol navigation without brittle regexes",
          "Workspace-wide refactors via typed edits",
          "Incremental context: only fetch what you need",
        ],
      },
      {
        type: "h2",
        text: "A tiny example",
      },
      {
        type: "code",
        language: "python",
        code: `definitions = await client.request_definition_locations(
  file_path="app.py",
  position=Position(line=10, character=5),
)`,
      },
      {
        type: "p",
        text: "This kind of API gives agents deterministic handles to code meaning, not just text shapes.",
      },
    ],
  },
  {
    slug: "from-rpc-to-markdown",
    title: "From RPC to Markdown: Turning Protocol Data into Agent Context",
    description:
      "How to present low-level protocol responses as readable, decision-ready context.",
    publishedAt: "2025-12-28",
    tags: ["LSAP", "UX", "Context"],
    readingMinutes: 5,
    blocks: [
      {
        type: "p",
        text: "Raw protocol payloads are dense. The trick is to compress them into a few predictable sections: intent, evidence, and next actions.",
      },
      { type: "h2", text: "A practical structure" },
      {
        type: "ul",
        items: [
          "Header: what the request was and why",
          "Findings: the minimal set of relevant locations/symbols",
          "Snippets: short excerpts around those locations",
          "Actions: edits, patches, and verification steps",
        ],
      },
      {
        type: "p",
        text: "Markdown is a convenient intermediate format because it preserves hierarchy, supports code blocks, and is easy for humans and models to skim.",
      },
    ],
  },
  {
    slug: "building-a-bun-spa",
    title: "Building a Fast SPA with Bun + Tailwind",
    description:
      "A small, pragmatic stack: Bun server routes, a single HTML entrypoint, and componentized UI.",
    publishedAt: "2025-11-10",
    tags: ["Bun", "Frontend", "Tailwind"],
    readingMinutes: 4,
    blocks: [
      {
        type: "p",
        text: "For a documentation-style site, you can keep things simple: serve one HTML file for all routes and let the client decide what to render.",
      },
      {
        type: "code",
        language: "ts",
        code: `"/*": index,`,
      },
      {
        type: "p",
        text: "This pattern supports deep links like /blog/some-post while staying deploy-friendly.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find(p => p.slug === slug);
}

export function getAllBlogTags() {
  const tags = new Set<string>();
  for (const post of BLOG_POSTS) for (const tag of post.tags) tags.add(tag);
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

