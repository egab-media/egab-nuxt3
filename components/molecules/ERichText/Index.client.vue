<script lang="ts">
import { Editor, JSONContent, AnyExtension } from '@tiptap/vue-3'
import { Editor as CoreEditor } from '@tiptap/core'
import throttle from 'lodash/throttle'
import isequal from 'lodash/isEqual'

import { VThemeProvider } from 'vuetify/components/VThemeProvider'
import { VInput } from 'vuetify/components/VInput'
import { VCard, VCardTitle } from 'vuetify/components/VCard'
import { VDivider } from 'vuetify/components/VDivider'
import {
  EDITOR_UPDATE_THROTTLE_WAIT_TIME, EDITOR_UPDATE_WATCH_THROTTLE_WAIT_TIME
} from '~/utils/rich-text/constants/define'
import { BaseKit } from '~/utils/rich-text/extensions/base-kit'

export default defineComponent({
  name: 'ERichText',
  components: {
    VThemeProvider,
    VInput,
    VCard,
    VCardTitle,
    VDivider
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
      validator: val => typeof val === 'boolean'
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
    //  editor
    extensions: {
      type: Array as () => AnyExtension[],
      default: () => []
    }
  },
  emits: ['enter', 'update:modelValue', 'change'],
  setup(props, { emit, attrs, expose }) {
    const getOutput = (editor: CoreEditor, output: string) => {
      if (output === 'html') { return editor.getHTML() }
      if (output === 'json') { return editor.getJSON() }
      if (output === 'text') { return editor.getText() }
      return ''
    }

    const editor = new Editor({
      content: props.modelValue,
      editorProps: {
        handleKeyDown: throttle(function (_view, event) {
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
      extensions: [BaseKit, ...unref(props.extensions)],
      autofocus: false,
      editable: !props.disabled,
      injectCSS: true
    })

    const onValueChange = throttle((val) => {
      if (!editor) { return }

      const output = getOutput(editor, props.output)

      if (isequal(output, val)) { return }

      const { from, to } = editor.state.selection
      editor.commands.setContent(val, false)
      editor.commands.setTextSelection({ from, to })
    }, EDITOR_UPDATE_WATCH_THROTTLE_WAIT_TIME)

    const onDisabledChange = (val: boolean) => editor?.setEditable(!val)

    watch(() => props.modelValue, onValueChange)
    watch(() => props.disabled, onDisabledChange)

    onUnmounted(() => editor?.destroy())

    expose({ editor })
    return { editor }
  }
})
</script>

<template>
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
            <delay-hydration>
              <lazy-molecules-e-rich-text-partials-e-rich-text-content :editor="editor" :is-fullscreen="isFullscreen" />
            </delay-hydration>
          </slot>

          <slot name="bottom" v-bind="editor">
            <delay-hydration>
              <lazy-molecules-e-rich-text-partials-e-rich-text-footer :editor="editor" />
            </delay-hydration>
          </slot>
        </v-card>
      </v-input>
    </v-theme-provider>
  </div>
</template>

<style scoped>

</style>
