import {
	accounts,
	jwkss,
	sessions,
	users,
	verifications,
} from "./auth.schema.ts";

export const dbAuthSchema = {
	users,
	verifications,
	sessions,
	accounts,
	jwkss,
};

export const dbSchema = {
	...dbAuthSchema,
};
