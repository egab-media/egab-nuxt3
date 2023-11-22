import { USER_TOKEN_NAME } from '~/utils/constants'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (body.token) {
    setCookie(event, USER_TOKEN_NAME, body.token, {
      domain: '',
      maxAge: 60 * 2,
      path: '/',
      sameSite: 'lax',
      secure: true,
      httpOnly: true
    })
    return 'auth cookie set successfully'
  }

  setCookie(event, USER_TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
    sameSite: 'lax',
    secure: true,
    httpOnly: true
  })
  return 'auth cookie cleared'
})
