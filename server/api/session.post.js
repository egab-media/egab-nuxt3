import { USER_TOKEN_NAME } from '~/utils/constants';
import { adminAuth } from '~/server/utils/firebase';
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    if (body.token) {
        try {
            await adminAuth.verifyIdToken(body.token);
            setCookie(event, USER_TOKEN_NAME, body.token, {
                domain: '',
                maxAge: 60 * 2,
                path: '/',
                sameSite: 'lax',
                secure: true,
                httpOnly: true
            });
            return 'auth cookie set';
        }
        catch (error) {
            switch (error.code) {
                case 'auth/id-token-expired':
                    throw createError({
                        statusCode: 401,
                        statusMessage: 'auth/id-token-expired',
                        message: 'token expired'
                    });
                default:
                    throw createError({
                        statusCode: 500,
                        statusMessage: 'firebase-error',
                        message: `error from firebase while verifying token => ${error.message}`
                    });
            }
        }
        //  TODO: Set custom claims here (optional)
    }
    setCookie(event, USER_TOKEN_NAME, '', {
        maxAge: -1,
        path: '/',
        sameSite: 'lax',
        secure: true,
        httpOnly: true
    });
    return 'auth cookie cleared';
});
