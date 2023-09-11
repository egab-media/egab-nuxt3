import {User} from '@firebase/auth'
import { EgabUser } from '~/utils/types'

export const useUser = () => useState<EgabUser | null>('user', () => null)
