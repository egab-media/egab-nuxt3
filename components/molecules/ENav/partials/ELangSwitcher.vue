<template>
  <v-select
    v-model="localeSelection"
    :items="languages"
    dense
    background-color="transparent"
    flat
    class="mt-5"
    item-text="value.name"
    item-value="value.code"
    full-width
    title="select language"
    aria-label="select language"
    :menu-props="{ bottom: true, offsetY: true }"
  >
    <template #item="{ item }">
      <v-list-item dense :prepend-avatar="item.value.flag" :to="switchLocalePath(item.value.code)" @click="$i18n.setLocale(item.value.code)">
        <v-list-item-title :class="item.value.name.toLowerCase() === 'arabic' ? 'atom-font__arabic' : ''">
          {{ item.value.name === 'Arabic' ? 'العربية' : item.value.name }}
        </v-list-item-title>
      </v-list-item>
    </template>
    <template #selection="{ item }">
      <v-list-item dense class="pa-0" :prepend-avatar="item.value.flag">
      <v-list-item-title class="text-body-2 font-weight-bold">
        {{ item.value.name === 'Arabic' ? 'العربية' : item.value.name }}
      </v-list-item-title>
      </v-list-item>
    </template>
  </v-select>
</template>

<script lang="ts">
export default defineComponent({
  name: 'ELangSwitcher'
})
</script>

<script lang="ts" setup>
import {VSelect} from "vuetify/components/VSelect";
import { VListItem, VListItemTitle } from 'vuetify/components/VList'
import {useLanguageStore} from "~/store/language";

const { locale } = useI18n()

const {languages} = useLanguageStore()
const localeSelection = ref(locale.value)
</script>

<style scoped>

</style>
