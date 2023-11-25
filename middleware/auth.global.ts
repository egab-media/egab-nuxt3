import { User } from 'firebase/auth'
import { useCurrentUserStore } from '~/store/auth/current-user'

export default defineNuxtRouteMiddleware(async (to) => {
  useCsrf()
  const { $pinia } = useNuxtApp()
  const { setCurrentUser } = useCurrentUserStore($pinia)
  // $firebaseAuth.onAuthStateChanged(user => {
  //   if (!user) {
  //
  //   }
  // })
  const { data, status, error, pending } = await useCsrfFetch('/api/auth/me', {
    method: 'GET',
    headers: useRequestHeaders(['cookie'])
  })
  console.log('middleware/data.value? => ', data)
  if (!data.value) {
    setCurrentUser(null)
    if (!to.name?.includes('auth')) navigateTo({ name: 'auth-persona___en', params: { persona: 'journalist' } })
  } else if (!!data.value) {
    setCurrentUser(data.value as User)
    if (to.name?.includes('auth')) navigateTo({ name: 'index' })
  } else if (!!error.value) {
    console.warn(error)
  }
})
