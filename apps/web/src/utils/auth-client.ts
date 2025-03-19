import { createAuthClient } from "better-auth/react";

const baseURL = import.meta.env.VITE_AUTH_BASE_URL || "http://localhost:3000";

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL,
});
