import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
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
	plugins: [],
	database: drizzleAdapter(db, {
		provider: "pg",
		camelCase: true,
		debugLogs: true,
		usePlural: true,
		schema: dbAuthSchema,
	}),
});
