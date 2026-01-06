import { serve } from "bun";
import index from "./index.html";

const basePort = (() => {
	const raw = process.env.PORT ?? process.env.BUN_PORT ?? "3000";
	const port = Number(raw);
	if (!Number.isFinite(port) || port <= 0) return 3000;
	return port;
})();

const config = {
	routes: {
		"/*": index,

		"/api/hello": {
			async GET(_req: Request) {
				return Response.json({
					message: "Hello, world!",
					method: "GET",
				});
			},
			async PUT(_req: Request) {
				return Response.json({
					message: "Hello, world!",
					method: "PUT",
				});
			},
		},

		"/api/hello/:name": async (
			req: Request & { params?: Record<string, string> },
		) => {
			const name = req.params?.name;
			return Response.json({
				message: `Hello, ${name}!`,
			});
		},
	},

	development: process.env.NODE_ENV !== "production" && {
		hmr: true,
		console: true,
	},
} satisfies Omit<Bun.ServeOptions, "port">;

let server: ReturnType<typeof serve> | null = null;
let lastError: unknown;

for (let port = basePort; port < basePort + 20; port++) {
	try {
		server = serve({ ...config, port });
		break;
	} catch (err) {
		lastError = err;
		if (
			err &&
			typeof err === "object" &&
			"code" in err &&
			err.code === "EADDRINUSE"
		) {
			continue;
		}
		throw err;
	}
}

if (!server) throw lastError;

console.log(`🚀 Server running at ${server.url}`);
