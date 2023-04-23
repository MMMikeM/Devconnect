import { z } from "zod"
import { procedure, router } from "../utils"

export default router({
  test: procedure.input(z.object({ name: z.string() })).query(({ input }) => {
    return `Hello ${input.name}`
  }),
})
