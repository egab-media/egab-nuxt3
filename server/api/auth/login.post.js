import { getAuth } from 'firebase-admin/auth';
import { USER_TOKEN_NAME } from '~/utils/constants';
const authCookieExpiry = 5 * 60 * 1000;
export default defineEventHandler(async (event) => {
    const { firebaseIdToken } = await readBody(event);
    try {
        //  Validate csrf cookie
        //  Create the session cookie
        const sessionCookie = await getAuth().createSessionCookie(firebaseIdToken, {
            expiresIn: authCookieExpiry
        });
        //  Set cookie
        setCookie(event, USER_TOKEN_NAME, sessionCookie, {
            maxAge: authCookieExpiry,
            sameSite: 'strict',
            httpOnly: true,
            secure: true,
            path: '/'
        });
        //  Verify cookie
        const token = await getAuth().verifySessionCookie(sessionCookie, true);
        //  TODO: custom claims
        // await getAuth().setCustomUserClaims(token.uid, {
        //   admin: true
        // })
        const user = await getAuth().getUser(token.uid);
        return user;
    }
    catch (error) {
        throw createError(error);
    }
});
