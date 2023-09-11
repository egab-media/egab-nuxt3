import useFirebaseServer from '~/server/utils/useFirebaseServer'

export default defineEventHandler(async (event) => {
  try {
    const cookie = getCookie(event, 'authCookie')

    if (!cookie) { return null }

    const {auth} = useFirebaseServer()
    const token = await auth.verifySessionCookie(cookie, true)
    return await auth.getUser(token.uid)
  } catch (error: any) {
    // event.node.res.statusCode = 401
    // event.node.res.statusMessage = error.code
    deleteCookie(event, 'authCookie', {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: true
    })
    return {
      user: null
    }
  }
})
