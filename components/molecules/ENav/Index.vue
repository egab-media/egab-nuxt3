<template>
  <v-app-bar fixed app>
    <!-- TODO: May be needed in mobile screens -->
    <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->

    <v-app-bar-title>
      Logo here
    </v-app-bar-title>

    <template v-slot:append>
      <v-lazy>
        <e-lang-switcher />
      </v-lazy>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
export default defineComponent({
  name: "ENav"
})
</script>

<script lang="ts" setup>
import { VAppBar, VAppBarTitle } from 'vuetify/components/VAppBar'
import { VLazy } from 'vuetify/components/VLazy'
import ELangSwitcher from './partials/ELangSwitcher.vue';
</script>

<style scoped>

</style>
