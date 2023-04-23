import type { Insertable, Selectable, Updateable } from "kysely"

export interface SessionsTable {
  sessionToken: string
  userId: string
  expires: Date
}

export type SessionRow = Selectable<SessionsTable>
export type InsertableSessionRow = Insertable<SessionsTable>
export type UpdateableSessionRow = Updateable<SessionsTable>
