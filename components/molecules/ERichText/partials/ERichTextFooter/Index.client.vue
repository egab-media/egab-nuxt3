<script lang="ts">
import { Editor } from '@tiptap/vue-3'

export default defineComponent({
  name: 'ERichTextFooter',
  props: {
    editor: {
      type: Object as () => Editor,
      required: true
    }
  }
})
</script>

<template>
  <v-toolbar
    class="px-4"
    density="compact"
    flat
  >
    <v-spacer />
    <span
      data-test="words"
      class="text-overline me-4"
    >
      {{ editor.storage.characterCount.words() }} Words
    </span>
    <span
      data-test="chars"
      class="text-overline"
    >
      {{ editor.storage.characterCount.characters() }} characters
    </span>
  </v-toolbar>
</template>

<style scoped>

</style>
