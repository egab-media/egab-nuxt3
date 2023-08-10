<template>
  <v-select
    v-model="localeSelection"
    :items="languages"
    solo
    flat
    class="mt-5"
    item-text="raw.name"
    item-value="raw.code"
    full-width
    :menu-props="{ bottom: true, offsetY: true }"
    title="select language"
    @change="handleLocaleChange"
  >
    <template #item="{ item }">
      <v-list-item dense @click="handleLocaleChange(item.raw)" :aria-selected="item.raw === localeSelection">
        <v-img
          max-width="30%"
          :src="item.raw.flag"
          contain
        />
        <v-list-item-title
            :class="item.raw.code === 'ar' ? 'atom-font__arabic' : ''"
        >
          {{ item.raw.code === 'ar' ? 'العربية' : item.raw.code }}
        </v-list-item-title>
      </v-list-item>
    </template>
    <template #selection="{ item }">
      <v-list-item dense class="pa-0">
        <!--              <v-img-->
        <!--                max-width="100%"-->
        <!--                max-height="100%"-->
        <!--                :src="item.raw"-->
        <!--                contain-->
        <!--              />-->
        <v-list-item-title class="text-body-2 font-weight-bold">
          {{item.raw}}
        </v-list-item-title>
      </v-list-item>
    </template>
  </v-select>
</template>

<script lang="ts">
export default {
  name: "ELangSwitcher"
}
</script>

<script lang="ts" setup>
import {VSelect} from "vuetify/components/VSelect";
import { VListItem, VListItemTitle } from 'vuetify/components/VList'
import {useLanguageStore} from "~/store/language";
import {storeToRefs} from "pinia";

const router = useRouter()
const { setLocale, locale } = useI18n();

const languageStore = useLanguageStore();
// states need to be reactive
const { languages } = storeToRefs(languageStore);

const localeSelection = ref(locale.value);

const handleLocaleChange = (newLocale: any) => {
  setLocale(newLocale.code)
};
</script>

<style scoped>

</style>
