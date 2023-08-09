<template>
  <nuxt-layout>
    <v-btn-primary color="primary">button</v-btn-primary>
    <v-icon :icon="mdiHome" color="secondary" />
  </nuxt-layout>
</template>

<script lang="ts" setup>
import {VIcon} from 'vuetify/components/VIcon'
import { mdiHome } from '@mdi/js'
</script>
