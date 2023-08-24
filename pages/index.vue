<template>
  <v-container>
    <delay-hydration>
      <e-input v-model="testValue" hint="some message" type="password" label="pass" :rules="['required', 'alpha']" />
      <organisms-e-auth />
    </delay-hydration>
  </v-container>
</template>

<script lang="ts">
export default defineComponent({
  name: "HomePage",
  data: () => ({
    testValue: ''
  })
})
</script>

<script lang="ts" setup>
import {VContainer} from 'vuetify/components/VGrid'

const {locale} = useI18n()
useHead({
  htmlAttrs: {
    lang: locale
  }
})

useSeoMeta({
  title: 'Egab Portal'
})
</script>

<style scoped>

</style>
