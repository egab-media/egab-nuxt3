import { useUser } from '~/composables/auth/useUser'
import { useRequestHeaders } from 'nuxt/app'

export default defineNuxtPlugin(async () => {
  const user = useUser()
  try {
    user.value = await $fetch('/api/auth/me', {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    })
    console.log('user from auth plugin => ', user.value)
  } catch (error: any) {
    console.log('error from plugins/auth.server.ts => ', error)
  }
})
