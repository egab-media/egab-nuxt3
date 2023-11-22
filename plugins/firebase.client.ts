import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { useCurrentUserStore } from '~/store/auth/current-user'

const setServerSession = (token: string) => {
  return $fetch('/api/session', {
    method: 'POST',
    body: { token }
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize firebase client
  const config = useRuntimeConfig()
  const { firebase } = config.public
  const app = initializeApp(firebase)
  const auth = getAuth(app)

  // get current user information
  const { setCurrentUser } = useCurrentUserStore()
  nuxtApp.hooks.hook('app:mounted', () => {
    auth.onIdTokenChanged(async (user) => {
      if (user) {
        const tokenRes = await user.getIdToken()
        await setServerSession(tokenRes)
        setCurrentUser(user)
      } else {
        await setServerSession('')
        setCurrentUser(null)
      }
    })
  })

  // Inject firebase modules into runtime
  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth
    }
  }
})
