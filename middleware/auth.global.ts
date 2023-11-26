import { useCurrentUserStore } from '~/store/auth/current-user'
import { callWithNuxt } from '#app'

export default defineNuxtRouteMiddleware(async (to) => {
  useCsrf()
  const nuxtApp = useNuxtApp()
  const { getTokenExpired, getUser } = useCurrentUserStore(nuxtApp.$pinia)
  //  TODO: add internationalization for navigation routes/names
  nuxtApp.hooks.hook('app:beforeMount', () => {
    if (getTokenExpired || !getUser) {
      if (to.name !== 'auth-persona___en') {
        callWithNuxt(nuxtApp, navigateTo, ['/en/auth/journalist'])
      }
    } else {
      if (to.name === 'auth-persona___en') {
        callWithNuxt(nuxtApp, navigateTo, ['/'])
      }
    }
  })
})
