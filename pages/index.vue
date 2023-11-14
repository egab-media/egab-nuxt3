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
    form: {
      email: ''
    }
  })
})
</script>

<template>
  <molecules-e-input-wrapper id="email" label="email" type="email" :model-value="form.email" :rules="['required', 'email']" />
</template>

<style scoped>

</style>
