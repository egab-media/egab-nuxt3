<script lang="ts">
import { VToolbar } from 'vuetify/components/VToolbar'
import { Editor } from '@tiptap/vue-3'
import { VSpacer } from 'vuetify/components/VGrid'

export default defineComponent({
  name: 'ERichTextFooter',
  components: {
    VToolbar,
    VSpacer
  },
  props: {
    editor: {
      type: Object as () => Editor,
      required: true
    }
  }
})
</script>

<template>
  <v-toolbar class="px-4" density="compact" flat>
    <v-spacer />
    <span class="text-overline me-4">
      {{ editor.storage.characterCount.words() }} Words
    </span>
    <span class="text-overline">
      {{ editor.storage.characterCount.characters() }} characters
    </span>
  </v-toolbar>
</template>

<style scoped>

</style>
