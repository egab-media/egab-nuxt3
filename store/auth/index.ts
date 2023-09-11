import { defineStore, StoreState } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    cookie: null
  }),
  hydrate(state: StoreState<any>) {
    const cookie = useCookie(useRuntimeConfig().public.firebaseAuthCookie.name)
    if (cookie) { state.cookie = cookie }
  }
})
