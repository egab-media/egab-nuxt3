import {User} from '@firebase/auth'

interface EgabUser extends User {}

export const useUser = () => useState<EgabUser | null>('user', () => null)
