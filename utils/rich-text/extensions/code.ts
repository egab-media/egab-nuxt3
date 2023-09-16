import type { CodeOptions as TiptapCodeOptions } from '@tiptap/extension-code'
import { Code as TiptapCode } from '@tiptap/extension-code'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface CodeOptions extends TiptapCodeOptions, GeneralOptions {
  button: ButtonView
}

export const Code = /* @__PURE__ */ TiptapCode.extend<CodeOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: defineAsyncComponent(() => import('@/components/EBtn/Index.vue')),
        componentProps: {
          action: () => editor.chain().focus().toggleCode().run(),
          isActive: () => editor.isActive('code') || false,
          icon: 'code',
          tooltip: t('editor.code.tooltip')
        }
      })
    }
  }
})
