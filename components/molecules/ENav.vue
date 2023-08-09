<template>
  <client-only>
    <v-app-bar fixed app>
      <!-- TODO: May be needed in mobile screens -->
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->

      <v-app-bar-title>
        Logo here
      </v-app-bar-title>
    </v-app-bar>
  </client-only>
</template>

<script lang="ts">
export default {
  name: "ENav"
}
</script>

<script lang="ts" setup>
import { VAppBar, VAppBarTitle } from 'vuetify/components/VAppBar'
</script>

<style scoped>

</style>
