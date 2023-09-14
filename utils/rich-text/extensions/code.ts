import type { CodeOptions as TiptapCodeOptions } from '@tiptap/extension-code'
import { Code as TiptapCode } from '@tiptap/extension-code'

import ActionButton from '@/components/EBtn/Index.vue'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface CodeOptions extends TiptapCodeOptions, GeneralOptions {
  button: ButtonView
}

export const Code = /* @__PURE__ */ TiptapCode.extend<CodeOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleCode(),
          isActive: () => editor.isActive('code') || false,
          icon: 'code',
          tooltip: t('editor.code.tooltip')
        }
      })
    }
  }
})
