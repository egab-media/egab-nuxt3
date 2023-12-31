<script lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import { getUnitWithPxAsDefault, isBoolean, isString } from '~/utils/rich-text/utils'
import { DEFAULT_MARKDOWN_THEME_VALUE } from '~/utils/rich-text/constants/define'

export default defineComponent({
  name: 'ERichTextContent',
  components: {
    EditorContent
  },
  props: {
    isFullscreen: {
      type: Boolean,
      default: false
    },
    markdownTheme: {
      type: [String, Boolean],
      default: undefined
    },
    dark: {
      type: Boolean,
      default: false,
      validator: val => typeof val === 'boolean'
    },
    maxWidth: {
      type: [String, Number],
      default: undefined
    },
    minHeight: {
      type: [String, Number],
      default: undefined
    },
    maxHeight: {
      type: [String, Number],
      default: 300
    },
    editor: { type: Object as () => Editor, required: true },
    editorClass: {
      type: [String, Array as () => string[], Object as () => Record<string, any>],
      default: undefined
    }
  },
  setup(props, { expose }) {
    const markdownTheme = () => {
      if (isBoolean(props.markdownTheme)) { return DEFAULT_MARKDOWN_THEME_VALUE }
      if (isString(props.markdownTheme)) { return props.markdownTheme }
      return DEFAULT_MARKDOWN_THEME_VALUE
    }

    const markdownThemeStyle = () => {
      return {
        [`markdown-theme-${unref(markdownTheme)}`]: isString(unref(markdownTheme))
      }
    }

    const contentDynamicClasses = computed(() => {
      const values: Record<string, any> = {
        __dark: unref(props.dark),
        ...unref(markdownThemeStyle)
      }
      return [values, props.editorClass]
    })

    const contentDynamicStyles = computed(() => {
      const maxWidth = getUnitWithPxAsDefault(props.maxWidth)
      const maxHeightStyle = {
        maxWidth,
        width: !maxWidth ? undefined : '100%',
        margin: !maxWidth ? undefined : '0 auto',
        backgroundColor: unref(props.dark) ? '#1E1E1E' : '#FFFFFF'
      }
      if (unref(props.isFullscreen)) { return { height: '100%', overflowY: 'auto', ...maxHeightStyle } }
      const minHeight = getUnitWithPxAsDefault(props.minHeight)
      const maxHeight = getUnitWithPxAsDefault(props.maxHeight)
      return {
        minHeight,
        maxHeight,
        overflow: 'auto',
        maxHeightStyle
      }
    })
    expose({ markdownTheme })
    return { contentDynamicClasses, contentDynamicStyles }
  }
})
</script>

<template>
  <editor-content
    id="content"
    class="vuetify-pro-tiptap-editor__content"
    :class="contentDynamicClasses"
    :style="contentDynamicStyles"
    :editor="editor"
    data-test="value"
  />
</template>

<style lang="scss">
.tiptap {
  min-height: 100px;
}
</style>
