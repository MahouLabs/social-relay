import { createAuthClient } from "better-auth/react";

const baseURL = import.meta.env.VITE_AUTH_BASE_URL || "http://localhost:3000";
console.log("Import meta env", import.meta.env);
export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL,
});
