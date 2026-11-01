import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: `${process.env.RUPSHORA_BACKEND_URL}`,
});