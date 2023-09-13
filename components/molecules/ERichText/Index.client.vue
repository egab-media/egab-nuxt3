<script lang="ts">
import { Editor, EditorContent, JSONContent, AnyExtension } from '@tiptap/vue-3'
import { Editor as CoreEditor } from '@tiptap/core'
import throttle from 'lodash/throttle'
import isequal from 'lodash/isEqual'

import {
  DEFAULT_MARKDOWN_THEME_VALUE,
  EDITOR_UPDATE_THROTTLE_WAIT_TIME, EDITOR_UPDATE_WATCH_THROTTLE_WAIT_TIME,
} from '~/utils/rich-text/constants/define'
import { VThemeProvider } from 'vuetify/components/VThemeProvider'
import { VInput } from 'vuetify/components/VInput'
import { VCard, VCardTitle } from 'vuetify/components/VCard'
import { VDivider } from 'vuetify/components/VDivider'
import { VToolbar } from 'vuetify/components/VToolbar'
import { VSpacer } from 'vuetify/components/VGrid'
import { getUnitWithPxAsDefault, isBoolean, isString } from '~/utils/rich-text/utils'
import { BaseKit } from '~/utils/rich-text/extensions/base-kit'

export default defineComponent({
  name: 'ERichText',
  emits: ['enter', 'update:modelValue', 'change'],
  components: {
    VThemeProvider,
    VInput,
    VCard,
    VCardTitle,
    VDivider,
    VToolbar,
    VSpacer,
    EditorContent
  },
  props: {
    modelValue: {
      type: [String, Object as () => JSONContent],
      default: ''
    },
    output: {
      type: String,
      default: 'html',
      validator: (val: string) => ['html', 'json', 'text'].includes(val)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false,
      validator: (val) => typeof val === 'boolean'
    },
    flat: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: true
    },
    isFullscreen: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: undefined
    },
    markdownTheme: {
      type: String,
      default: undefined
    },
    maxWidth: {
      type: [String, Number],
      default: undefined
    },
    minWidth: {
      type: [String, Number],
      default: undefined
    },
    maxHeight: {
      type: [String, Number],
      default: undefined
    },
    //  editor
    extensions: {
      type: Array as () => AnyExtension[],
      default: () => []
    },
    editorClass: {
      type: [String, Array as () => string[], Object as () => Record<string, any>],
      default: undefined
    }
  },
  setup(props, { emit, attrs, expose }) {
    const getOutput = (editor: CoreEditor, output: string) => {
      if (output === 'html') return editor.getHTML()
      if (output === 'json') return editor.getJSON()
      if (output === 'text') return editor.getText()
      return ''
    }

    const editor = new Editor({
      content: props.modelValue,
      editorProps: {
        handleKeyDown: throttle(function (view, event) {
          if (event.key === 'Enter' && attrs.enter && !event.shiftKey) {
            emit('enter')

            return true
          }

          return false
        }, EDITOR_UPDATE_THROTTLE_WAIT_TIME)
      },
      onUpdate: throttle(({ editor }) => {
        const output = getOutput(editor, props.output)

        emit('update:modelValue', output)

        emit('change', { editor, output })
      }, EDITOR_UPDATE_THROTTLE_WAIT_TIME),
      extensions: [BaseKit,...unref(props.extensions)],
      autofocus: false,
      editable: !props.disabled,
      injectCSS: true
    })

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

    const contentDynamicClasses = () => {
      const values: Record<string, any> = {
        __dark: unref(props.dark),
        ...unref(markdownThemeStyle)
      }
      return [values, props.editorClass]
    }

    const contentDynamicStyles = () => {
      const maxWidth = getUnitWithPxAsDefault(props.maxWidth)
      const maxHeightStyle = {
        maxWidth,
        width: !maxWidth ? undefined : '100%',
        margin: !maxWidth ? undefined : '0 auto',
        backgroundColor: unref(props.dark) ? '#1E1E1E' : '#FFFFFF'
      }
      if (unref(props.isFullscreen)) { return { height: '100%', overflowY: 'auto', ...maxHeightStyle } }
      const minHeight = getUnitWithPxAsDefault(props.minWidth)
      const maxHeight = getUnitWithPxAsDefault(props.maxHeight)
      return {
        minHeight,
        maxHeight,
        overflow: 'auto',
        maxHeightStyle
      }
    }

    const onValueChange = throttle((val) => {
      if (!editor) return

      const output = getOutput(editor, props.output)

      if (isequal(output, val)) return

      const { from, to } = editor.state.selection
      editor.commands.setContent(val, false)
      editor.commands.setTextSelection({ from, to })
    }, EDITOR_UPDATE_WATCH_THROTTLE_WAIT_TIME)

    const onDisabledChange = (val: boolean) => editor?.setEditable(!val)

    watch(() => props.modelValue, onValueChange)
    watch(() => props.disabled, onDisabledChange)

    onUnmounted(() => editor?.destroy())

    expose({ editor })
    return { editor, contentDynamicClasses, contentDynamicStyles }
  }
})
</script>

<template>
  <client-only>
    <div v-if="editor">
      <v-theme-provider :theme="dark ? 'dark' : 'light'">
        <!-- TODO: Add Bubble Menu component -->

        <v-input class="pt-0" hide-details="auto">
          <v-card
            :flat="flat"
            :outlined="outlined"
            v-bind="$attrs"
            :style="{
              borderColor: $attrs['error-messages'] ? '#ff5252' : undefined,
              width: '100%'
            }"
            class="vuetify-pro-tiptap-editor"
            :class="{ 'vuetify-pro-tiptap-editor--fullscreen': isFullscreen }"
          >
            <template v-if="label && !isFullscreen">
              <v-card-title :class="dark ? 'bg-grey-darken-3' : 'bg-grey-lighten-3'">
                {{ label }}
              </v-card-title>

              <v-divider />
            </template>

            <!-- TODO: Add Toolbar -->

            <slot
              name="editor"
              v-bind="{ editor, props: { class: 'vuetify-pro-tiptap-editor__content', 'data-test': 'value' } }"
            >
              <editor-content
                class="vuetify-pro-tiptap-editor__content"
                :class="contentDynamicClasses"
                :style="contentDynamicStyles"
                :editor="editor"
                data-test="value"
              />
            </slot>

            <slot name="bottom" v-bind="editor">
              <v-toolbar class="px-4" density="compact" flat>
                <v-spacer />
                <span class="text-overline me-4">
                  {{ editor.storage.characterCount.words() }} Words
                </span>
                <span class="text-overline">
                  {{ editor.storage.characterCount.characters() }} characters
                </span>
              </v-toolbar>
            </slot>
          </v-card>
        </v-input>
      </v-theme-provider>
    </div>
  </client-only>
</template>

<style scoped>

</style>
