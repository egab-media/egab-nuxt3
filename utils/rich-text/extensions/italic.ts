import type { ItalicOptions as TiptapItalicOptions } from '@tiptap/extension-italic'
import { Italic as TiptapItalic } from '@tiptap/extension-italic'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface ItalicOptions extends TiptapItalicOptions, GeneralOptions {
  button: ButtonView
}

export const Italic = /* @__PURE__ */ TiptapItalic.extend<ItalicOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: defineAsyncComponent(() => import('@/components/EBtn/Index.vue')),
        componentProps: {
          action: () => editor.chain().focus().toggleItalic().run(),
          isActive: () => editor.isActive('italic') || false,
          icon: 'italic',
          tooltip: t('editor.italic.tooltip')
        }
      })
    }
  }
})
