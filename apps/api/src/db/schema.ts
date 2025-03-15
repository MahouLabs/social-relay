import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text, } from "drizzle-orm/sqlite-core"

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified").notNull(),
  image: text("image"),
  createdAt: integer("created_at").notNull(),
  updatedAt: integer("updated_at").notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: text("expires_at").notNull().default(sql`(current_timestamp)`),
  token: text("token").notNull().unique(),
  createdAt: text("created_at").notNull().notNull().default(sql`(current_timestamp)`),
  updatedAt: text("updated_at").notNull().notNull().default(sql`(current_timestamp)`),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: text("access_token_expires_at"),
  refreshTokenExpiresAt: text("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: text("created_at").notNull().notNull().default(sql`(current_timestamp)`),
  updatedAt: text("updated_at").notNull().notNull().default(sql`(current_timestamp)`),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: text("expires_at").notNull().notNull().default(sql`(current_timestamp)`),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
});
