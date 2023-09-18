<script lang="ts" setup>
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
    <molecules-e-rich-text
      v-model="inputVal"
      :error-messages="['message-one']"
    />
  </v-container>
</template>

<style scoped>

</style>
