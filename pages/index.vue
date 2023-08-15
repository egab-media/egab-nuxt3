<template>
  <h2 class="text-h2">{{ $t('hello') }}</h2>
</template>

<script lang="ts">
export default defineComponent({
  name: "HomePage",
  data: () => ({
    selectValue: ''
  })
})
</script>

<script lang="ts" setup>
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
