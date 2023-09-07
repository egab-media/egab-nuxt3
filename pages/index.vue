<script lang="ts" setup>
import useAuth from '~/composables/auth/useAuth'
import { useUser } from '~/composables/auth/useUser'

definePageMeta({
  middleware: 'user-only'
})

const cookie = useCookie(useRuntimeConfig().public.firebaseAuthCookie.name)
console.log(cookie.value)

const user = useUser()
const { logout } = useAuth()
</script>

<template>
  <h1>Dashboard</h1>
  <p>This is a protected route.</p>
  <p>You can test if Auth works SSR by reloading this page.</p>
  <button v-if="cookie" @click="logout">logout here</button>
  {{cookie}}
</template>

<style scoped>

</style>
