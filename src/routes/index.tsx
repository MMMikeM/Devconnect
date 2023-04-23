import { getSession } from "@solid-auth/base"
import { signIn } from "@solid-auth/base/client"
import { createSignal, onCleanup, Show } from "solid-js"
import { Navigate, useRouteData } from "solid-start"
import { createServerData$ } from "solid-start/server"
import { authOptions } from "./api/auth/[...solidauth]"

export const routeData = () =>
  createServerData$(async (_, event) => {
    return await getSession(event.request, authOptions)
  })
export default function Home() {
  const session = useRouteData<typeof routeData>()
  const [redirectIn, setRedirectIn] = createSignal(3)

  const int = setInterval(() => {
    setRedirectIn((prev) => prev - 1)
  }, 1000)

  onCleanup(() => clearInterval(int))

  return (
    <main>
      <h1>Home</h1>
      <Show
        when={session()}
        fallback={
          <>
            <span>You are not signed in.</span>
            <button onClick={() => signIn("github")}>Sign In</button>
          </>
        }
      >
        <span>Redirecting to protected page in {redirectIn()} seconds...</span>
        <Show when={redirectIn() <= 0}>
          <Navigate href="/protected" />
        </Show>
      </Show>
    </main>
  )
}
