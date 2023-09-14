import type { BlockquoteOptions as TiptapBlockquoteOptions } from '@tiptap/extension-blockquote'
import { Blockquote as TiptapBlockquote } from '@tiptap/extension-blockquote'
import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

import ActionButton from '@/components/EBtn/Index.vue'

export interface BlockquoteOptions extends TiptapBlockquoteOptions, GeneralOptions {
  button: ButtonView
}

export const Blockquote = /* @__PURE__ */ TiptapBlockquote.extend<BlockquoteOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'blockquote'
      },
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleBlockquote(),
          isActive: () => editor.isActive('blockquote') || false,
          icon: 'blockquote',
          tooltip: t('editor.blockquote.tooltip')
        }
      })
    }
  }
})
