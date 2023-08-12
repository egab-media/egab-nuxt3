<template>
  <v-app>
    <delay-hydration>
      <molecules-e-nav />
    </delay-hydration>
    <v-main>
      <slot />
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
</script>

<style scoped>

</style>
