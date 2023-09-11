import { EgabUser } from '~/utils/types'
declare module 'h3' {
  interface H3EventContext {
    user?: EgabUser
  }
}

export {}
