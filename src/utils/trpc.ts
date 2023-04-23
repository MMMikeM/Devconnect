import { QueryClient } from "@tanstack/solid-query"
import { createTRPCSolidStart } from "solid-trpc"
import { httpBatchLink } from "@trpc/client"
import config from "~/config"

import type { IAppRouter } from "~/server/trpc/router/_app"

const baseUrl = typeof window === "undefined" ? config.url : ""
const links = [httpBatchLink({ url: `${baseUrl}/api/trpc` })]

export const trpc = createTRPCSolidStart<IAppRouter>({ config: () => ({ links }) })

export const queryClient = new QueryClient()
