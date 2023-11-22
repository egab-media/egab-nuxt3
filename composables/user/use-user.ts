import { DecodedIdToken } from 'firebase-admin/lib/auth'
import { User } from 'firebase/auth'

export default function() {
  return useState<User | DecodedIdToken | null>('user', () => null)
}
