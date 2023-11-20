import AuthModule from '~/repository/modules/auth'
import { $fetch, FetchOptions } from 'ofetch'

interface IApiInstance {
  auth: AuthModule
}

/**
 * This can be used through destructuring nuxt3 runtime context
 * e.g. const {$api} = useNuxtApp()
 * $api.moduleName.methodName
 */
export default defineNuxtPlugin((nuxtApp) => {
  const fetchOptions: FetchOptions = {
    baseURL: nuxtApp.$config.API_BASE_URL as string || ''
  }

  const apiFetcher = $fetch.create(fetchOptions)
  // Expose all available repositories
  const modules: IApiInstance = {
    auth: new AuthModule(apiFetcher)
  }

  return {
    provide: {
      api: modules
    }
  }
})
