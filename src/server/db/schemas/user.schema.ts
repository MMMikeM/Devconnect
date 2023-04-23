import type { Generated, Insertable, Selectable, Updateable } from "kysely"

export interface UsersTable {
  id: Generated<string>
  email: string
  emailVerified: Date | null
  name?: string | null
  image?: string | null
}

export type UserRow = Selectable<UsersTable>
export type InsertableUserRow = Insertable<UsersTable>
export type UpdateableUserRow = Updateable<UsersTable>
