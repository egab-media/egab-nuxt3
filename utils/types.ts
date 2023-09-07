import { UserRecord } from 'firebase-admin/lib/auth/user-record'

export interface EgabUser extends Partial<UserRecord> {
  username?: string
}
