export default defineEventHandler(async (event) => {
  deleteCookie(event, 'authCookie', {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true
  })
  return {
    user: null
  }
})
