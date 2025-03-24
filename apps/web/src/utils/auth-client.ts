import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL: "https://api.social-relay.com",
  baseURL: import.meta.env.VITE_API_URL,
});
