import { getIdToken, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import { useCurrentUserStore } from '~/store/auth/current-user'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth'

export const useAuth = () => {
  const { $firebaseAuth, $pinia } = useNuxtApp()
  const { setCurrentUser } = useCurrentUserStore($pinia)

  const registerWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword($firebaseApp, email, password)
      const firebaseIdToken = await getIdToken(result.user)
      // send token
      const { data } = await useCsrfFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ firebaseIdToken })
      })
      setCurrentUser(data.user)
    } catch (error) {
      setCurrentUser(null)
    }
  }

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword($firebaseAuth, email, password)
      const firebaseIdToken = await getIdToken(result.user)
      //  send token to server
      const { data } = await useCsrfFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ firebaseIdToken })
      })
      setCurrentUser(data.value as User)
      navigateTo({ name: 'index___en' })
    } catch (error) {
      setCurrentUser(null)
    }
  }

  const googleProvider = new GoogleAuthProvider()
  const loginWithProvider = async (provider = googleProvider) => {
    try {
      const result = await signInWithPopup($firebaseAuth, provider)
      const firebaseIdToken = await getIdToken(result.user)

      //  Send token to server
      const { data } = await useCsrfFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ firebaseIdToken })
      })

      setCurrentUser(data.user)
    } catch (error) {
      setCurrentUser(null)
    }
  }

  return {
    loginWithEmailAndPassword,
    registerWithEmailAndPassword
  }
}

export default useAuth
