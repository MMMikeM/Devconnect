import GitHub from "@auth/core/providers/github"
import { SolidAuth } from "@solid-auth/base"
import config from "~/config"
import KyselyAdapter from "~/utils/auth-adapter"
import { db } from "~/server/db"

import type { SolidAuthConfig } from "@solid-auth/base"
import type { Provider } from "@auth/core/providers"

const { clientId, clientSecret } = config.auth.github

export const authOptions: SolidAuthConfig = {
  adapter: KyselyAdapter(db),
  providers: [GitHub({ clientId, clientSecret }) as Provider],
  debug: true,
}

export const { GET, POST } = SolidAuth(authOptions)
