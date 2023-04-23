import type { Generated, Insertable, Selectable, Updateable } from "kysely"
export interface VerificationTokensTable {
  identifier: Generated<string>
  token: string
  expires: Date
}

export type VerificationTokenRow = Selectable<VerificationTokensTable>
export type InsertableVerificationTokenRow = Insertable<VerificationTokensTable>
export type UpdateableVerificationTokenRow = Updateable<VerificationTokensTable>
