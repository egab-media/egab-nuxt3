import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import serviceAccountJson from './service-account-staging.json'

export default function useFirebaseServer() {
  const app = getApps()[0] ?? initializeApp({
    credential: cert(serviceAccountJson)
  })

  const auth = getAuth(app)

  return { auth }
}
