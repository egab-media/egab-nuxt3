<script lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import { Editor as CoreEditor } from '@tiptap/core'
import throttle from 'lodash/throttle'
import { EDITOR_UPDATE_THROTTLE_WAIT_TIME } from '~/utils/constants/rich-text/define'
import { VThemeProvider } from 'vuetify/components/VThemeProvider'
import { VInput } from 'vuetify/components/VInput'
import { VCard, VCardTitle } from 'vuetify/components/VCard'
import { VDivider } from 'vuetify/components/VDivider'
import { VToolbar } from 'vuetify/components/VToolbar'
import { VSpacer } from 'vuetify/components/VGrid'

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
      type: String,
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
    }
  },
  setup(props) {
    const contentDynamicClasses = () => {
      const values: Record<string, any> = {
        __dark: unref(props.dark)
        //  markdownThemeStyles
      }
    }
  },
  data: () => ({
    editor: null as CoreEditor | null
  }),
  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      editorProps: {
        handleKeyDown: throttle((view, event) => {
          if (event.key === 'Enter' && this.$attrs.enter && !event.shiftKey) {
            this.$emit('enter')
            return true
          }
          return false
        }, EDITOR_UPDATE_THROTTLE_WAIT_TIME)
      },
      onUpdate: throttle(({editor}) => {
        const output = this.getOutput(editor, this.output)
        this.$emit('update:modelValue', output)
        this.$emit('change', { editor, output })
      }, EDITOR_UPDATE_THROTTLE_WAIT_TIME),
      extensions: [],
      autofocus: false,
      editable: !this.disabled,
      injectCSS: true
    })
  },
  methods: {
    getOutput(editor: CoreEditor, output: string) {
      if (output === 'html') return editor.getHTML()
      if (output === 'json') return editor.getJSON()
      if (output === 'text') return editor.getText()
      return ''
    }
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
            <editor-content
              class="vuetify-pro-tiptap-editor__content"

            />
          </slot>
        </v-card>
      </v-input>
    </v-theme-provider>
  </div>
</template>

<style scoped>

</style>
