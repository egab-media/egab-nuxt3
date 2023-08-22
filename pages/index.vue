<template>
  <v-container>
    <delay-hydration>
      <h2 class="text-h2">{{ $t('hello') }}</h2>
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
import {VCard, VCardTitle, VCardText} from 'vuetify/components/VCard'

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
