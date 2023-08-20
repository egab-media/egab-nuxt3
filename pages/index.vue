<template>
  <v-container>
    <delay-hydration>
      <h2 class="text-h2">{{ $t('hello') }}</h2>
      <v-card>
        <v-card-title>
          <v-row justify="center">
            Some Title
          </v-row>
        </v-card-title>
        <e-input type="text" label="Some Text" cols="3" :rules="['required']" />
        <e-input v-model="testValue" type="password" label="Password" cols="3" :rules="['required']" />
      </v-card>
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
import {VContainer, VRow} from 'vuetify/components/VGrid'
import {VCard, VCardTitle} from 'vuetify/components/VCard'

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
