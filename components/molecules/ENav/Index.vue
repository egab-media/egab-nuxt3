<template>
  <client-only>
    <v-app-bar fixed app>
      <!-- TODO: May be needed in mobile screens -->
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->

      <v-app-bar-title>
        Logo here
      </v-app-bar-title>

      <template v-slot:append>
        <e-lang-switcher />
      </template>
    </v-app-bar>
  </client-only>
</template>

<script lang="ts">
export default {
  name: "ENav",
  components: {

  }
}
</script>

<script lang="ts" setup>
import { VAppBar, VAppBarTitle } from 'vuetify/components/VAppBar'
import ELangSwitcher from "./partials/ELangSwitcher.vue";
</script>

<style scoped>

</style>
