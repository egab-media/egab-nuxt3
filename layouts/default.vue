<template>
  <v-app>
    <delay-hydration>
      <molecules-e-nav />
    </delay-hydration>
    <v-main>
      <v-locale-provider :rtl="locale === 'ar'">
        <slot />
      </v-locale-provider>
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default defineComponent({
  name: 'DefaultLayout'
})
</script>

<script lang="ts" setup>
import {VApp} from 'vuetify/components/VApp'
import {VMain} from 'vuetify/components/VMain'
import {VLocaleProvider} from 'vuetify/components/VLocaleProvider'
import {useI18n} from 'vue-i18n'

const { locale } = useI18n()
</script>

<style scoped>

</style>
