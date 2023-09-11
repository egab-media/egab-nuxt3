import useFirebaseServer from '~/server/utils/useFirebaseServer'

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event)
  const expiresIn = 60 * 60 * 24 * 1000

  try {
    const { auth } = useFirebaseServer()
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true
    }

    const authCookie = await auth.createSessionCookie(token, { expiresIn })
    setCookie(event, 'authCookie', authCookie, options)

    //  verify session cookie
    const sessionToken = await auth.verifySessionCookie(authCookie, true)
    //  set custom claims
    //  doc https://firebase.google.com/docs/auth/admin/custom-claims
    await auth.setCustomUserClaims(sessionToken.uid, {
      journalist: true
    })

    return {
      statusCode: 200,
      message: authCookie
    }
  } catch (error: any) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: error.message
    })
  }
})
