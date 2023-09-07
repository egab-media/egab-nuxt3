import {getApps, initializeApp} from '@firebase/app'
import {getFirestore} from '@firebase/firestore'
import {getAuth} from '@firebase/auth'

export default function useFirebase() {
  const config = useRuntimeConfig().public.firebase
  const app = getApps()[0] ?? initializeApp(config)

  const firestore = getFirestore(app)
  const auth = getAuth(app)

  return { auth, firestore }
}
