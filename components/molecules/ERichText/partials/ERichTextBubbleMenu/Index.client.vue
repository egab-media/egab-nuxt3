<script lang="ts">
import { NodeSelection } from '@tiptap/pm/state'
import { BubbleMenu, Editor } from '@tiptap/vue-3'
import { Extension } from '@tiptap/core'
import { VCard, VCardText } from 'vuetify/components/VCard'
import { VToolbar } from 'vuetify/components/VToolbar'
import { VDivider } from 'vuetify/components/VDivider'
import { BubbleTypeMenu, NodeTypeKey } from '~/utils/rich-text/extensions/components/bubble'
import { BaseKitOptions } from '~/utils/rich-text/extensions/base-kit'

export default defineComponent({
  name: 'ERichTextBubbleMenu',
  components: { BubbleMenu, VCard, VCardText, VToolbar, VDivider },
  props: {
    editor: {
      type: Object as () => Editor,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { t } = useI18n()
    const tippyOptions = reactive<Record<string, unknown>>({
      maxWidth: 'auto',
      zIndex: 20,
      appendTo: 'parent'
    })

    const nodeType = computed<NodeTypeKey | undefined>(() => {
      const selection = props.editor.state.selection as NodeSelection
      const isImage = selection?.node?.type.name === 'image'
      const isVideo = selection?.node?.type.name === 'video'
      const isText = selection?.node?.type.name === 'text'

      if (isImage) { return 'image' }
      if (isVideo) { return 'video' }
      if (isText) { return 'text' }
      return undefined
    })

    const nodeMenus = () => {
      const { extensions = [] } = props.editor.extensionManager
      const find = extensions.find(k => k.name === 'base-kit') as Extension<BaseKitOptions>
      if (!find) { return {} }
      const { button } = find.options?.bubble ?? {}
      if (!button) { return {} }
      const _button: BubbleTypeMenu = button({
        editor: props.editor,
        extension: find,
        t: unref(t)
      })
      return _button
    }

    const items = () => {
      if (!nodeType.value) { return [] }
      return nodeMenus()?.[nodeType.value] ?? []
    }

    return { items, tippyOptions }
  }
})
</script>

<template>
  <bubble-menu v-if="items.length > 0" :editor="editor" :tippy-options="tippyOptions">
    <v-card class="vuetify-pro-tiptap-editor__menu-bubble">
      <v-card-text class="d-flex pa-0">
        <v-toolbar density="compact" flat height="auto" class="py-1 ps-1">
          <template v-for="(item, key) in items" :key="key">
            <v-divider v-if="item.type === 'divider'" vertical class="mx-1 me-2" />
            <component :is="item.component" v-else v-bind="item.componentProps" :editor="editor" :disabled="disabled" />
          </template>
        </v-toolbar>
      </v-card-text>
    </v-card>
  </bubble-menu>
</template>

<style scoped>

</style>
