import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac, admin, user, editor } from "@/lib/auth/permissions";
import { createAuthMiddleware, APIError } from "better-auth/api";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: client,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin,
        user,
        editor,
      },
    }),
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }
      const raw = process.env.ALLOWED_EMAILS?.replace(/^['"]|['"]$/g, "");
      const rawEmails = raw?.split("|");
      if (!rawEmails || rawEmails.length === 0) {
        throw new APIError("INTERNAL_SERVER_ERROR", {
          message: "No allowed emails configured on the server.",
        });
      }

      const allowedEmails = rawEmails.map((email) =>
        email.trim().toLowerCase()
      );
      const email = ctx.body?.email?.toLowerCase();

      const allowedEmails = rawEmails.map((email) =>
        email.trim().toLowerCase()
      );
      const email = ctx.body?.email?.toLowerCase();
      if (!email || !allowedEmails.includes(email)) {
        throw new APIError("FORBIDDEN", {
          message: "This email is not allowed to register.",
        });
      }
    }),
  },
});

export {client, db}