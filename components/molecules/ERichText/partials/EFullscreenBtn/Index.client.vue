<script lang="ts">
import { Editor } from '@tiptap/vue-3'

export default defineComponent({
  name: 'EFullscreenBtn',
  props: {
    editor: {
      type: Object as () => Editor,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: undefined
    },
    isActive: {
      type: Function,
      default: undefined
    }
  },
  setup() {
    const isFullscreen = ref(false)
    const onAction = () => {
      isFullscreen.value = !isFullscreen.value
      if (isFullscreen.value) {
        document.documentElement.classList.add('overflow-y-hidden')
      } else {
        document.documentElement.classList.remove('overflow-y-hidden')
      }
    }
    return { isFullscreen, onAction }
  }
})
</script>

<template>
  <e-btn
    :icon="isFullscreen ? 'fullscreenExit' : 'fullscreen'"
    :is-active="isActive"
    :disabled="disabled"
    :color="color"
    :tooltip="isFullscreen ? 'editor.fullscreen.tooltip.exit' : 'editor.fullscreen.tooltip.fullscreen'"
    @click="onAction"
  />
</template>
