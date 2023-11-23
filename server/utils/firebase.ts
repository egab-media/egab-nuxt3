import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

export const adminApp = initializeApp({
  credential: applicationDefault(),
  projectId: 'egab-staging'
  // databaseURL: process.env.FIREBASE_DATABASE_URL
})

export const adminAuth = getAuth()
