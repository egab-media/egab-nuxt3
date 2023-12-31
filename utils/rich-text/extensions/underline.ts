import type { UnderlineOptions as TiptapUnderlineOptions } from '@tiptap/extension-underline'
import { Underline as TiptapUnderline } from '@tiptap/extension-underline'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface UnderlineOptions extends TiptapUnderlineOptions, GeneralOptions {
  button: ButtonView
}

export const Underline = /* @__PURE__ */ TiptapUnderline.extend<UnderlineOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: defineAsyncComponent(() => import('@/components/EBtn/Index.vue')),
        componentProps: {
          action: () => editor.chain().focus().toggleUnderline().run(),
          isActive: () => editor.isActive('underline') || false,
          icon: 'underline',
          tooltip: t('editor.underline.tooltip')
        }
      })
    }
  }
})
