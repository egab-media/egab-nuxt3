<script lang="ts" setup>
import { VContainer } from 'vuetify/components/VGrid'
import { VIcon } from 'vuetify/components'

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
    <e-fps />
    <molecules-e-input-wrapper
      v-model="inputVal"
      label="meow"
    />
    <e-btn text="dadfa" />
    <v-icon icon="custom:EIconGoogle" />
    <e-illustration />
    <e-avatar img-src="https://placehold.co/600x400" size="100" />
  </v-container>
</template>

<style scoped>

</style>
