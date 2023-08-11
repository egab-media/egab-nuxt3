import en from './en-US.json'
import ar from './ar-SA.json'

export default defineI18nConfig(() => ({
    legacy: true,
    locale: 'en',
    detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root',  // recommended
    },
    messages: {en, ar}
}))
