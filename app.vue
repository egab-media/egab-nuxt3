<template>
  <nuxt-layout>
    <v-btn-primary color="primary">button</v-btn-primary>
    <v-icon :icon="mdiHome" color="secondary" />
    <p class="text-h1">title panton</p>
  </nuxt-layout>
</template>

<script lang="ts" setup>
import {VIcon} from 'vuetify/components/VIcon'
import { mdiHome } from '@mdi/js'
</script>
