import type { ColorOptions as TiptapColorOptions } from '@tiptap/extension-color'
import { Color as TiptapColor } from '@tiptap/extension-color'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface ColorOptions extends TiptapColorOptions, GeneralOptions {
  button: ButtonView
}

export const Color = /* @__PURE__ */ TiptapColor.extend<ColorOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: defineAsyncComponent(() => import('@/components/molecules/ERichText/partials/EColorBtn/Index.vue')),
        componentProps: {
          action: (color?: unknown) => {
            if (typeof color === 'string') { editor.chain().focus().setColor(color).run() }
          },
          isActive: () => {
            const { color } = editor.getAttributes('textStyle')

            if (!color) { return false }
            return editor.isActive({ color }) || false
          },
          icon: 'color',
          tooltip: t('editor.color.tooltip')
        }
      })
    }
  }
})
