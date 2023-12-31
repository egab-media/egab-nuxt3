import type { CodeBlockOptions as TiptapCodeBlockOptions } from '@tiptap/extension-code-block'
import { CodeBlock as TiptapCodeBlock } from '@tiptap/extension-code-block'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface CodeBlockOptions extends TiptapCodeBlockOptions, GeneralOptions {
  button: ButtonView
}

export const CodeBlock = /* @__PURE__ */ TiptapCodeBlock.extend<CodeBlockOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: defineAsyncComponent(() => import('@/components/EBtn/Index.vue')),
        componentProps: {
          action: () => editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => editor.isActive('codeBlock') || false,
          icon: 'codeBlock',
          tooltip: t('editor.codeblock.tooltip')
        }
      })
    }
  }
})
