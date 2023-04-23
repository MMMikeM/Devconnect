import { createSolidAPIHandler } from "solid-start-trpc"
import { createContext } from "~/server/trpc/context"
import { appRouter as router } from "~/server/trpc/router/_app"

const handler = createSolidAPIHandler({ router, createContext })

export const GET = handler
export const POST = handler
