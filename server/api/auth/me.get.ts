import { USER_TOKEN_NAME } from '~/utils/constants'
import { getAuth } from 'firebase-admin/auth'
import { FirebaseError } from 'firebase-admin'

export default defineEventHandler(async (event) => {
  const firebaseIdToken = getCookie(event, USER_TOKEN_NAME)

  if (!firebaseIdToken) return null

  try {
    const token = await getAuth().verifySessionCookie(firebaseIdToken, true)
    const user = await getAuth().getUser(token.uid)
    return user
  } catch (error: unknown) {
    const knownError = error as FirebaseError
    throw createError({
      statusCode: 401,
      message: knownError.message,
      stack: knownError.stack,
      statusMessage: knownError.code,
      statusText: knownError.code
    })
  }
})
