import { defineStore } from "pinia";
import { User } from 'firebase/auth'

const getDefaultState = () => ({
  user: null as null | User,
  token: null as null | string,
  tokenExpired: false
})

type RootState = ReturnType<typeof getDefaultState>;

export const useCurrentUserStore = defineStore('current-user', {
  state: getDefaultState,
  getters: {
    getUser: (state: RootState) => state.user,
    getToken: (state: RootState) => state.token,
    getTokenExpired: (state: RootState) => state.tokenExpired
  },
  actions: {
    setCurrentUser(value: null | User) {
      this.user = value
      if (value) {
        this.setToken(value.accessToken)
      } else {
        this.setToken(null)
      }
    },
    setToken(value: string | null) {
      this.token = value
    },
    setTokenExpired(value: boolean) {
      this.tokenExpired = value
    }
  }
})
