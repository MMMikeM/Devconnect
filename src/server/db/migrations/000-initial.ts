import type { Kysely } from "kysely"

export const up = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("email", "varchar(50)", (col) => col.notNull())
    .addColumn("emailVerified", "timestamp")
    .addColumn("name", "varchar(50)")
    .addColumn("image", "varchar(150)")
    .execute()

  await db.schema
    .createTable("accounts")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("userId", "serial", (col) => col.references("users.id").notNull())
    .addColumn("type", "varchar(10)", (col) => col.notNull())
    .addColumn("provider", "varchar(30)", (col) => col.notNull())
    .addColumn("providerAccountId", "varchar(50)", (col) => col.notNull())
    .addColumn("refresh_token", "varchar(150)")
    .addColumn("access_token", "varchar(40)")
    .addColumn("expires_at", "integer")
    .addColumn("token_type", "varchar(20)")
    .addColumn("scope", "varchar(150)")
    .addColumn("id_token", "varchar(150)")
    .addColumn("session_state", "varchar(150)")
    .addColumn("oauth_token_secret", "varchar(150)")
    .addColumn("oauth_token", "varchar(150)")
    .execute()

  await db.schema
    .createTable("sessions")
    .addColumn("userId", "serial", (col) => col.references("users.id").notNull())
    .addColumn("sessionToken", "varchar(50)", (col) => col.primaryKey())
    .addColumn("expires", "timestamp", (col) => col.notNull())

    .execute()

  await db.schema
    .createTable("verification_tokens")
    .addColumn("identifier", "varchar(150)", (col) => col.primaryKey())
    .addColumn("token", "varchar(150)", (col) => col.notNull())
    .addColumn("expires", "timestamp", (col) => col.notNull())
    .execute()
}

export const down = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema.dropTable("accounts").execute()
  await db.schema.dropTable("sessions").execute()
  await db.schema.dropTable("verification_tokens").execute()
  await db.schema.dropTable("users").execute()
}
