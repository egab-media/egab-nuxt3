<script lang="ts">
import { Editor } from '@tiptap/vue-3'
import { IconsOptions } from '~/utils/rich-text/constants/icons'
import { ButtonViewReturnComponentProps } from '~/utils/rich-text/constants/type'

export default defineComponent({
  name: 'ELinkBtn',
  props: {
    editor: {
      type: Editor,
      required: true
    },
    icon: {
      type: String as () => keyof IconsOptions,
      default: undefined
    },
    tooltip: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: undefined
    },
    action: {
      type: Function as ButtonViewReturnComponentProps['action'],
      default: undefined
    },
    isActive: {
      type: Function,
      default: undefined
    }
  },
  setup(props) {
    const href = ref<string | undefined>(undefined)
    const onAction = () => {
      const { href: _href } = props.editor.getAttributes('link')
      href.value = _href
    }
    return { href, onAction }
  }
})
</script>

<template>
  <e-btn
    :icon="icon"
    :tooltip="tooltip"
    :disabled="disabled"
    :color="color"
    :is-active="isActive"
    :action="onAction"
  >
    <!-- Link Dialog -->
    <molecules-e-rich-text-partials-e-link-dialog :editor="editor" />
  </e-btn>
</template>

<style scoped>

</style>
