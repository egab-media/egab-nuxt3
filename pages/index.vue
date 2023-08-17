<template>
  <h2 class="text-h2">{{ $t('hello') }}</h2>
  <e-input v-model="testValue" type="password" label="ssss" cols="3" :rules="['required']" />
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
