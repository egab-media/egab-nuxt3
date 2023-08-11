<template>
  <v-select
    v-model="locale"
    :items="availableLocales"
    solo
    flat
    dense
    class="mt-5"
    title="select language"
    item-text="raw.name"
    item-value="raw.code"
    full-width
    :menu-props="{ bottom: true, offsetY: true }"
  />
</template>

<script lang="ts">
export default {
  name: "ELangSwitcher"
}
</script>

<script lang="ts" setup>
import {VSelect} from "vuetify/components/VSelect";

const router = useRouter()
const { locale, availableLocales } = useI18n()
</script>

<style scoped>

</style>
