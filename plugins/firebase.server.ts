import { USER_TOKEN_NAME } from '~/utils/constants'
import { useCurrentUserStore } from '~/store/auth/current-user'
import { adminAuth } from '~/config/firebase-admin'

export default defineNuxtPlugin(async () => {
  const token = useCookie(USER_TOKEN_NAME)
  const { setTokenExpired } = useCurrentUserStore()

  if (!token.value) { return }

  try {
    //  consume firebase admin auth module
    const foundUser = await adminAuth.verifyIdToken(token.value)
  } catch (error: any) {
    switch (error.code) {
      case 'auth/id-token-expired':
        setTokenExpired(true)
        console.log('token expired...')
        break
      default:
        console.log('error while verifying token: ', error.message)
    }
  }
})
