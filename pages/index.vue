<script lang="ts" setup>
import { VContainer } from 'vuetify/components/VGrid'

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
  <v-container>
    <molecules-e-input-wrapper
      v-model="inputVal"
      label="meow"
    />
    <e-btn text="dadfa" />
  </v-container>
</template>

<style scoped>

</style>
