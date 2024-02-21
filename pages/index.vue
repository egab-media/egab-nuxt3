<script lang="ts" setup>
import { useCurrentUserStore } from '~/store/auth/current-user'
import { storeToRefs } from 'pinia'

const { locale } = useI18n()
useHead({
  htmlAttrs: {
    lang: locale
  }
})
useSeoMeta({
  title: 'Egab Portal'
})

const { $firebaseAuth } = useNuxtApp()
const { getUser, user, getTokenExpired } = storeToRefs(useCurrentUserStore())
const router = useRouter()

const logout = async () => {
  await $firebaseAuth.signOut()
  await router.push({ name: `auth-persona___en`, params: { persona: 'journalist' } })
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'HomePage',
  data: () => ({
    form: {
      email: ''
    }
  })
})
</script>

<template>
  <client-only>
    <v-card>
      <v-card-title>
        Welcome, {{ getUser?.email }}
      </v-card-title>
      <v-card-text>Data: {{ getUser }}</v-card-text>
      <v-card-text>Data: {{ user }}</v-card-text>
      <v-card-actions>
        <v-btn
          text="logout"
          @click="logout"
        />
      </v-card-actions>
    </v-card>
  </client-only>
</template>

<style scoped>

</style>
