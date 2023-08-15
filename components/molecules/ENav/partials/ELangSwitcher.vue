<template>
  <e-select
    v-model="localeSelection"
    :items="langs"
    dense
    cols="12"
    background-color="transparent"
    flat
    class="mt-5"
    item-text="value.name"
    item-value="value.code"
    full-width
    title="select language"
    aria-label="select language"
    :menu-props="{ bottom: true, offsetY: true, closeOnContentClick: true }"
  >
    <template #item="{ item }">
      <v-list-item height="30" dense :prepend-avatar="item.value.flag" :to="switchLocalePath(item.value.code)" @click="handleClick(item.value.code)">
        <v-list-item-title :class="item.value.name === 'Arabic' ? 'atom-font__arabic' : ''">
          {{ item.value.name === 'Arabic' ? 'العربية' : item.value.name }}
        </v-list-item-title>
      </v-list-item>
    </template>
    <template #selection="{ item }">
      {{item}}
      <v-list-item dense max-height="10" class="pa-0" :prepend-avatar="item.value.flag">
      <v-list-item-title class="text-body-2 font-weight-bold">
        {{ item.value.name === 'Arabic' ? 'العربية' : item.value.name }}
      </v-list-item-title>
      </v-list-item>
    </template>
  </e-select>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {langs} from "~/utils/languages";

export default defineComponent({
  name: 'ELangSwitcher',
  data: (vm) => ({
    localeSelection: langs.find(lang => lang.code === vm.$i18n.locale),
    font: 'Panton',
    langs,
  }),
  methods: {
    handleClick(code: string) {
      this.$i18n.setLocale(code)
      this.localeSelection = langs.find(lang => lang.code === code)
      this.font = this.localeSelection!.code === 'ar' ? 'Ge' : 'Panton'
    }
  }
})
</script>

<script lang="ts" setup>
import { VListItem, VListItemTitle } from 'vuetify/components/VList'
</script>

<style scoped lang="scss">
@use "assets/variables" with (
  $font-family: v-bind(font),
);
</style>
