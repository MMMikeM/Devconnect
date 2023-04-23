import type { Generated, Insertable, Selectable, Updateable } from "kysely"

export interface AccountTable {
  id: Generated<string>
  userId: string
  type: "oidc" | "oauth" | "email" | "credentials"
  provider: string
  providerAccountId: string
  refresh_token?: string
  access_token?: string
  expires_at?: number
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string
  oauth_token_secret?: string
  oauth_token?: string
}

export type AccountRow = Selectable<AccountTable>
export type InsertableAccountRow = Insertable<AccountTable>
export type UpdateableAccountRow = Updateable<AccountTable>
