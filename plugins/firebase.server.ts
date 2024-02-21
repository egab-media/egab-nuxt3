import { cert, getApp, initializeApp } from 'firebase-admin/app'

const createFirebaseApp = () => {
  const config = useRuntimeConfig()
  try {
    return getApp()
  } catch {
    return initializeApp({
      credential: cert({
        projectId: 'egab-staging',
        clientEmail: config.clientEmail as string,
        privateKey: (config.privateKey as string).replace(/\\n/g, '\n')
      }),
    })
  }
}

export default defineNuxtPlugin(() => {
  createFirebaseApp()
})
