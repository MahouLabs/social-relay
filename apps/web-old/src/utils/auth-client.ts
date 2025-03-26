import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "http://localhost:8787",
});
