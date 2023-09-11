<script lang="ts" setup>
import useAuth from '~/composables/auth/useAuth'
import { useAuthStore } from '~/store/auth'
import { useUser } from '~/composables/auth/useUser'

definePageMeta({
  middleware: 'user-only'
})

const { user, cookie } = useAuthStore()
console.log('user from store => ', user, 'cookie from store => ', cookie)

const localUser = useUser()
console.log('local user => ', localUser)

const { logout } = useAuth()
</script>

<template>
  <h1>Dashboard</h1>
  <p>This is a protected route.</p>
  <p>You can test if Auth works SSR by reloading this page.</p>
  <button v-if="localUser" @click="logout">logout here</button>
</template>

<style scoped>

</style>
