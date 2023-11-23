<script setup lang="ts">
import { useCurrentUserStore } from '~/store/auth/current-user'
import { User } from 'firebase/auth'

const { setTokenExpired } = useCurrentUserStore()
const {$firebaseAuth} = useNuxtApp()
const router = useRouter()
const route = useRoute()

const setServerSession = (token: string) => {
  return $fetch('/api/session', {
    method: 'POST',
    body: { token }
  })
}

onMounted(() => {
  $firebaseAuth.onIdTokenChanged(async (user: User | null) => {
    if (user) {
      const redirectUrl = route.query.redirectUrl as string
      const token = await user.getIdToken()
      await setServerSession(token)
      setTokenExpired(false)
      if (redirectUrl) {
        console.log('redirect url => ', redirectUrl)
        navigateTo(redirectUrl)
      }
      else { navigateTo('/') }
    }
  })
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'PrivatePage'
})
</script>

<template>
  <v-card>
    <v-card-title>Token expired. Waiting for new token...</v-card-title>
  </v-card>
</template>

<style scoped>

</style>
