import { useUser } from '~/composables/auth/useUser'
import useFirebase from '~/composables/auth/useFirebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

export default function useAuth() {
  const user = useUser()
  const errorBag = ref({
    email: null,
    password: null,
    name: null
  })

  function resetErrors () {
    errorBag.value = {
      email: null,
      password: null,
      name: null
    }
  }

  async function serverAuth(token: string) {
    try {
      const res = await $fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ token }) })
      if (res.statusCode === 200) { navigateTo('/') }
    } catch (error) {
      console.log('invalid credentials')
    }
  }

  const { auth } = useFirebase()

  async function login({ email, password }: { email: string, password: string }) {
    //  reset errors
    // resetErrors()
    //  TODO: validate data on serverside
    try {
      const userDetails = await signInWithEmailAndPassword(auth, email, password)
      user.value = userDetails.user
      const token = await userDetails.user.getIdToken()
      await serverAuth(token)
      navigateTo('/')
    } catch (error) {}
  }

  // TODO: to be implemented
  function loginGoogle() {}

  async function signup({ email, password, name }: { email: string, password: string, name: string }) {
    // resetErrors()
    //  TODO: Validate data on serverside
    const userDetails = await createUserWithEmailAndPassword(auth, email, password)
    user.value = userDetails.user
    const token = await userDetails.user.getIdToken()
    await serverAuth(token)
  }

  async function logout() { await auth.signOut() }

  onAuthStateChanged(auth, (userDetails) => {
    if (userDetails) { user.value = userDetails }
  })

  return { user, login, signup, logout }
}
