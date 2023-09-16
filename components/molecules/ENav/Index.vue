<script lang="ts" setup>
import ELangSwitcher from './partials/ELangSwitcher.vue'
</script>

<script lang="ts">
export default defineComponent({
  name: 'ENav',
  data: () => ({})
})
</script>

<template>
  <v-app-bar fixed app>
    <!-- TODO: May be needed in mobile screens -->
    <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
    <v-app-bar-title>
      Logo here
    </v-app-bar-title>

    <template #append>
      <e-lang-switcher />
    </template>
  </v-app-bar>
</template>

<style scoped lang="scss">
//@use 'vuetify/settings' with (
//  $app-bar-transition: none
//);
</style>
