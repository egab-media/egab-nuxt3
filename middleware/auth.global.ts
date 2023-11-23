import { USER_TOKEN_NAME } from '~/utils/constants'

// TODO: check for a way to use the cookies instead of using store
export default defineNuxtRouteMiddleware(async (to) => {
  console.log('running global middleware')
  const userToken = useCookie(USER_TOKEN_NAME)
  if (userToken) {
    console.log('user token exists => ', userToken.value)
  }
})
