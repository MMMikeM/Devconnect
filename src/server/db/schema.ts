import type { AccountTable } from "./schemas/account.schema"
import type { SessionsTable } from "./schemas/session.schema"
import type { UsersTable } from "./schemas/user.schema"
import type { VerificationTokensTable } from "./schemas/verification-token.schema"

export interface Database {
  users: UsersTable
  accounts: AccountTable
  sessions: SessionsTable
  verification_tokens: VerificationTokensTable
}
