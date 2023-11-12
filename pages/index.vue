<script lang="ts" setup>
import { EAuthPassword } from '~/features/authentication/components/partials'

const { locale } = useI18n()
useHead({
  htmlAttrs: {
    lang: locale
  }
})

useSeoMeta({
  title: 'Egab Portal'
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'HomePage',
  data: () => ({
    inputVal: ''
  })
})
</script>

<template>
  <e-auth-password is-register />
</template>

<style scoped>

</style>
