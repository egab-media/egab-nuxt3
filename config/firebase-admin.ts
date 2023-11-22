import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { auth } from 'firebase-admin'

export const adminApp = initializeApp({
  credential: applicationDefault()
  // databaseURL: process.env.FIREBASE_DATABASE_URL
})

export const adminAuth = auth()
