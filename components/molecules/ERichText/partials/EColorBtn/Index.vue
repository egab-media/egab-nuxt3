<script lang="ts">
import { Editor } from '@tiptap/vue-3'
import { IconsOptions } from '~/utils/rich-text/constants/icons'
import { ButtonViewReturnComponentProps } from '~/utils/rich-text/constants/type'

export default defineComponent({
  name: 'EColorBtn',
  props: {
    editor: {
      type: Object as () => Editor,
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
    const color = ref('')
    watchEffect(() => {
      const { color: colorVal } = props.editor.getAttributes('textStyle')
      color.value = colorVal
    })
    return { color }
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
  >
    <!-- TODO: add color picker component -->
    <lazy-molecules-e-rich-text-partials-e-color-picker
      v-model="color"
      :nudge-top="-4"
      :nudge-left="8"
      @change="action?.(color)"
    />
  </e-btn>
</template>

<style scoped>

</style>
