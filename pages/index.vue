<script lang="ts" setup>
import { VContainer } from 'vuetify/components/VGrid'
import { VForm } from 'vuetify/components/VForm'

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
    <v-form ref="form">
      <molecules-e-rich-text v-model="inputVal" :error-messages="['message-one']" />
    </v-form>
  </v-container>
</template>

<style scoped>

</style>
