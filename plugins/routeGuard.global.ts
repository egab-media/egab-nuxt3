import { useCurrentUserStore } from '~/store/auth/current-user'

export default defineNuxtPlugin(() => {
  const { getUser, getTokenExpired } = useCurrentUserStore()

  addRouteMiddleware('route-guard', (to) => {
    if (to.path !== '/token-expired' && getTokenExpired) {
      return navigateTo({
        path: '/token-expired',
        query: {
          redirectUrl: to.path
        }
      })
    }

    if (to.path === '/login' && getUser) return navigateTo('/')
    if (to.path === '/' && ! getUser) return navigateTo('/auth/journalist')
  }, { global: true })
})
