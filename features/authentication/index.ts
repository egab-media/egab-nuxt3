/**
 * @file this is the entry point of the authentication feature
 **/
//  Components
import EAuth from './components/EAuth/Index.vue'
//  Composables
import { useAuth } from './composables/auth/firebase'

export {
  EAuth,
  useAuth
}
