import { accounts, sessions, users, verifications } from "./auth.schema.ts";

export const dbAuthSchema = {
	users,
	verifications,
	sessions,
	accounts,
};

export const dbSchema = {
	...dbAuthSchema,
};
