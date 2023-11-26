import { USER_TOKEN_NAME } from '~/utils/constants';
import { getAuth } from 'firebase-admin/auth';
export default defineEventHandler(async (event) => {
    const firebaseIdToken = getCookie(event, USER_TOKEN_NAME);
    if (!firebaseIdToken)
        return null;
    try {
        const token = await getAuth().verifySessionCookie(firebaseIdToken, true);
        const user = await getAuth().getUser(token.uid);
        return user;
    }
    catch (error) {
        const knownError = error;
        throw createError({
            statusCode: 401,
            message: knownError.message,
            stack: knownError.stack,
            statusMessage: knownError.code,
            statusText: knownError.code
        });
    }
});
