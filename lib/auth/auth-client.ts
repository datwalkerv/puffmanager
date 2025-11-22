import { createAuthClient } from "better-auth/react";
import { adminClient, organizationClient } from "better-auth/client/plugins";
import { ac, admin, user, editor } from "@/lib/auth/permissions";

export const authClient = createAuthClient({
baseURL: process.env.BETTER_AUTH_URL!,
  plugins: [
    adminClient(),
    organizationClient()
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;