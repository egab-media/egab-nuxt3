import { useCurrentUserStore } from '~/store/auth/current-user'
import { User } from 'firebase/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()

  // @ts-ignore
  const { setTokenExpired, setCurrentUser } = useCurrentUserStore(nuxtApp.$pinia)

  //  CASE: Using SSR alongside with firebase
  if (config.public.usingSSR && config.public.usingFirebase) {
    const { data, error } = await useCsrfFetch('/api/auth/me', {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    })

    if (error.value?.data.statusMessage === 'auth/session-cookie-expired') {
      setTokenExpired(true)
      //  TODO: add snackbar notification for end user to know that session has expired
    }

    if (!data.value) {
      setCurrentUser(null)

    } else if (!!data.value) {
      setCurrentUser(data.value as User)
    }
  } else {
    //  TODO: Add SPA code here
  }
})
