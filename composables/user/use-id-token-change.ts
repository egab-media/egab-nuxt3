import { USER_TOKEN_NAME } from '~/utils/constants'
import { Unsubscribe } from '@firebase/util'

/**
 * Sets user composable & token cookie
 */
export default function () {
  const { $firebaseAuth } = useNuxtApp()
  const token = useCookie(USER_TOKEN_NAME)

  const firebaseUser = useUser()
  let unsubscribe: Unsubscribe

  onMounted(() => {
    unsubscribe = $firebaseAuth.onIdTokenChanged(async user => {
      if (user) {
        token.value = await user.getIdToken()
        firebaseUser.value = user
      }
    })
  })

  onUnmounted(() => {
    unsubscribe?.()
  })
}
