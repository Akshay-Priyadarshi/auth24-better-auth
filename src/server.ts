import fastifyCors from "@fastify/cors";
import type { FastifyInstance } from "fastify";
import Fastify from "fastify";
import { auth } from "./lib/auth.ts";

export const instantiateFastifyServer = async (): Promise<FastifyInstance> => {
	// Your configured Better Auth instance

	const fastify = Fastify({ logger: true });

	// Configure CORS policies
	fastify.register(fastifyCors, {
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
		credentials: true,
		maxAge: 86400,
	});

	// Register authentication endpoint
	fastify.route({
		method: ["GET", "POST"],
		url: "/api/auth/*",
		async handler(request, reply) {
			try {
				// Construct request URL
				const url = new URL(request.url, `http://${request.headers.host}`);

				// Convert Fastify headers to standard Headers object
				const headers = new Headers();
				Object.entries(request.headers).forEach(([key, value]) => {
					if (value) headers.append(key, value.toString());
				});

				// Create Fetch API-compatible request
				const req = new Request(url.toString(), {
					method: request.method,
					headers,
					body: request.body ? JSON.stringify(request.body) : undefined,
				});

				// Process authentication request
				const response = await auth.handler(req);

				// Forward response to client
				reply.status(response.status);
				// biome-ignore lint/suspicious/useIterableCallbackReturn: Headers class foreach
				response.headers.forEach((value, key) => reply.header(key, value));
				reply.send(response.body ? await response.text() : null);
			} catch (error: unknown) {
				fastify.log.error(error);
				reply.status(500).send({
					error: "Internal authentication error",
					code: "AUTH_FAILURE",
				});
			}
		},
	});
	return fastify;
};

const main = async () => {
	const fastify = await instantiateFastifyServer();
	try {
		const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
		const HOST = process.env.HOST || "0.0.0.0";
		await fastify.listen({ port: PORT, host: HOST });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

main();
