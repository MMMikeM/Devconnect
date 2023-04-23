import { router } from "~/server/trpc/utils"
import example from "./test"

export const appRouter = router({ example })

export type IAppRouter = typeof appRouter
