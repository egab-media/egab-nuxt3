import { $Fetch } from 'ofetch'
import { HTTPMethod } from 'h3'

// To use this properly, visit plugins/restApi.ts
class HttpFactory {
  private readonly $fetch: $Fetch

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher
  }

  async call<T>(method: HTTPMethod | undefined, url: string, data?: object, extras = {}): Promise<T> {
    return await this.$fetch(url, {method, body: data, ...extras})
  }
}

export default HttpFactory
