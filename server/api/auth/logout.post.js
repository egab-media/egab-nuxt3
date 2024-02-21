import { USER_TOKEN_NAME } from '~/utils/constants';
export default defineEventHandler(async (event) => {
    deleteCookie(event, USER_TOKEN_NAME, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'strict'
    });
    return {
        user: null
    };
});
