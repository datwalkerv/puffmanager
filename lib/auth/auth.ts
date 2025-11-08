import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac, admin, user, editor } from "@/lib/auth/permissions";

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
});

export {client, db}