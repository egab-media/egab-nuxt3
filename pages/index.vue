<template>
  <v-container>
    <delay-hydration>
      <e-input hint="some message">
        <template #message="{message}">
          -- {{message}}
        </template>
      </e-input>
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
