<script lang="ts">
import { Editor } from '@tiptap/vue-3'

export default defineComponent({
  name: 'ELinkDialog',
  props: {
    linkRef: {
      type: String,
      default: undefined
    },
    editor: {
      type: Object as () => Editor,
      required: true
    },
    destroy: {
      type: Function,
      default: undefined
    }
  },
  setup(props) {
    // const url = ref('')
    const link = ref('')
    const dialog = ref(false)

    const apply = () => {
      if (link.value?.length) {
        props.editor.chain().focus().extendMarkRange('link').setLink(({ href: link.value })).run()
      }
      close()
    }

    const close = () => {
      dialog.value = false
      link.value = ''
      setTimeout(() => props.destroy?.(), 300)
    }

    return {
      link,
      dialog,
      close,
      apply
    }
  }
})
</script>

<template>
  <v-dialog v-model="dialog" max-width="400" activator="parent" @click:outside="close">
    <v-card>
      <v-toolbar class="px-6" density="compact">
        <span class="headline">{{ $t('editor.link.dialog.title') }}</span>
        <v-spacer />
        <e-btn icon="close" @click="close" />
      </v-toolbar>

      <v-card-text>
        <molecules-e-input-wrapper v-model="link" type="text" :label="$t('editor.link.dialog.link')" />
      </v-card-text>

      <v-card-actions>
        <e-btn @click="apply">
          {{ $t('editor.link.dialog.button.apply') }}
        </e-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
