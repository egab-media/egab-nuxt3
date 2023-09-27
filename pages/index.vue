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
  <v-card>
    <e-fps />
    <molecules-e-input-wrapper
      type="phone"
    />
  </v-card>
</template>

<style scoped>

</style>
