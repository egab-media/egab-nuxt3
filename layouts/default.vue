<template>
  <v-app>
    <molecules-e-nav />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default {
  name: "DefaultLayout"
}
</script>

<script lang="ts" setup>
import {VApp} from 'vuetify/components/VApp'
import {VMain} from 'vuetify/components/VMain'
</script>

<style scoped>

</style>
