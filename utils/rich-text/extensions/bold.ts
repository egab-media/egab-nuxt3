import type { BoldOptions as TiptapImageOptions } from '@tiptap/extension-bold'
import { Bold as TiptapBold } from '@tiptap/extension-bold'

import ActionButton from '@/components/EBtn/Index.vue'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface BoldOptions extends TiptapImageOptions, GeneralOptions {
  button: ButtonView
}

export const Bold = /* @__PURE__ */ TiptapBold.extend<BoldOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleBold().run(),
          isActive: () => editor.isActive('bold') || false,
          icon: 'bold',
          tooltip: t('editor.bold.tooltip')
        }
      })
    }
  }
})
