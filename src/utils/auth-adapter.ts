import type { Adapter, AdapterSession, AdapterUser } from "@auth/core/adapters"
import type { Kysely } from "kysely"
import type { Database } from "~/server/db/schema"

const KyselyAdapter = (db: Kysely<Database>): Adapter => ({
  createUser: async (user) =>
    await db.insertInto("users").values(user).returningAll().executeTakeFirstOrThrow(),
  getUser: async (id) =>
    await db.selectFrom("users").where("id", "=", id).selectAll().executeTakeFirstOrThrow(),
  getUserByEmail: async (email) =>
    (await db.selectFrom("users").where("email", "=", email).selectAll().executeTakeFirst()) ??
    null,
  getUserByAccount: async ({ provider, providerAccountId }) =>
    (await db
      .selectFrom("accounts")
      .where("provider", "=", provider)
      .where("providerAccountId", "=", providerAccountId)
      .innerJoin("users", "accounts.userId", "users.id")
      .selectAll()
      .executeTakeFirst()) ?? null,
  updateUser: async (user: Partial<AdapterUser> & { id: string }) =>
    await db
      .updateTable("users")
      .set(user)
      .where("users.id", "=", user.id)
      .returningAll()
      .executeTakeFirstOrThrow(),
  deleteUser: async (userId) =>
    await db.deleteFrom("users").where("id", "=", userId).returningAll().executeTakeFirstOrThrow(),
  linkAccount: async (account) => {
    await db
      .insertInto("accounts")
      .values({ ...account })
      .executeTakeFirstOrThrow()
  },
  unlinkAccount: async ({ providerAccountId, provider }) => {
    await db
      .deleteFrom("accounts")
      .where("provider", "=", provider)
      .where("providerAccountId", "=", providerAccountId)
      .executeTakeFirstOrThrow()
  },
  createSession: async ({ sessionToken, userId, expires }) =>
    await db
      .insertInto("sessions")
      .values({ sessionToken, userId, expires })
      .returningAll()
      .executeTakeFirstOrThrow(),

  getSessionAndUser: async (sessionToken) => {
    const data = await db
      .selectFrom("sessions")
      .where("sessionToken", "=", sessionToken)
      .innerJoin("users", "sessions.userId", "users.id")
      .selectAll()
      .executeTakeFirstOrThrow()

    const session: AdapterSession = {
      sessionToken: data.sessionToken,
      userId: data.userId,
      expires: data.expires,
    }

    const user: AdapterUser = {
      id: data.id,
      name: data.name,
      email: data.email,
      image: data.image,
      emailVerified: data.emailVerified,
    }

    return { session, user }
  },
  updateSession: async ({ sessionToken }) =>
    await db
      .updateTable("sessions")
      .set({ sessionToken })
      .where("sessionToken", "=", sessionToken)
      .returningAll()
      .executeTakeFirstOrThrow(),

  deleteSession: async (sessionToken) => {
    await db
      .deleteFrom("sessions")
      .where("sessionToken", "=", sessionToken)
      .executeTakeFirstOrThrow()
  },
  createVerificationToken: async ({ identifier, expires, token }) =>
    await db
      .insertInto("verification_tokens")
      .values({ identifier, expires, token })
      .returningAll()
      .executeTakeFirstOrThrow(),
  useVerificationToken: async ({ identifier, token }) =>
    await db
      .deleteFrom("verification_tokens")
      .where("identifier", "=", identifier)
      .where("token", "=", token)
      .returningAll()
      .executeTakeFirstOrThrow(),
})

export default KyselyAdapter
