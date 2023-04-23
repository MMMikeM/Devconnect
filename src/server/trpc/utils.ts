import { initTRPC } from "@trpc/server"
import { IContext } from "./context"

export const { router, procedure } = initTRPC.context<IContext>().create()
