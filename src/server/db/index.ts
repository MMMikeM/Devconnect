// import { Pool } from "pg"
import pg from "pg"
import { Kysely, PostgresDialect } from "kysely"
import config from "~/config"
import type { Database } from "./schema"

const { host, database, password, user, port } = config.database

const { Pool } = pg

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({ host, database, password, user, port }),
  }),
})

export { db }
