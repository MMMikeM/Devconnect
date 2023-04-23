import * as path from "path"
import { promises as fs } from "fs"
import { Migrator, FileMigrationProvider } from "kysely"
import { db } from "."
import { z } from "zod"

const migrationFolder = `${process.cwd()}/src/server/db/migrations`

const migrate = async (direction: "up" | "down" | "latest") => {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder,
    }),
  })

  const { error, results } =
    direction === "up"
      ? await migrator.migrateUp()
      : direction === "down"
      ? await migrator.migrateDown()
      : await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error("failed to migrate")
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

try {
  const direction = z.enum(["up", "down", "latest"]).parse(process.argv[2])
  migrate(direction)
} catch (error) {
  console.error("Invalid input")
  if (error instanceof z.ZodError) {
    console.error(error.issues[0].message)
  }
  process.exit(1)
}
