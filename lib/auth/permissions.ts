import { createAccessControl } from "better-auth/plugins/access";

export const statement = {
  project: ["create", "share", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  project: ["create"],
});

export const admin = ac.newRole({
  project: ["create", "update"],
});

export const editor = ac.newRole({
  project: ["create", "update"],
});