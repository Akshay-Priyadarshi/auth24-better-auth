import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer, jwt, openAPI } from "better-auth/plugins";
import { db } from "../db/postgres.ts";
import { dbAuthSchema } from "../db/schemas/index.ts";

export const auth = betterAuth({
	trustedOrigins: ["*"],
	secret: process.env.BETTER_AUTH_SECRET,
	url: process.env.BETTER_AUTH_URL,
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8,
		maxPasswordLength: 64,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		},
	},
	plugins: [
		openAPI({
			theme: "deepSpace",
		}),
		jwt({ jwt: { issuer: "auth24", expirationTime: "1h" } }),
		bearer(),
	],
	advanced: {
		defaultCookieAttributes: {
			sameSite: "lax",
			secure: true,
			httpOnly: true,
		},
	},
	database: drizzleAdapter(db, {
		provider: "pg",
		camelCase: true,
		debugLogs: true,
		usePlural: true,
		schema: dbAuthSchema,
	}),
});
