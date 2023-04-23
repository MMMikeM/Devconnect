import GitHub from "@auth/core/providers/github"
import { SolidAuth, SolidAuthConfig } from "@auth/solid-start"
import config from "~/config"

import type { Provider } from "@auth/core/providers"

const { clientId, clientSecret } = config.auth.github

export const authOptions: SolidAuthConfig = {
  providers: [GitHub({ clientId, clientSecret }) as Provider],
  debug: false,
}

export const { GET, POST } = SolidAuth(authOptions)
