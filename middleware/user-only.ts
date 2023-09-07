export default defineNuxtRouteMiddleware(async () => {
  const cookie = useCookie(useRuntimeConfig().public.firebaseAuthCookie.name)

  if (!cookie) { return navigateTo('/login') }
})
