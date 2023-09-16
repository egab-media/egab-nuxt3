import type { StrikeOptions as TiptapStrikeOptions } from '@tiptap/extension-strike'
import { Strike as TiptapStrike } from '@tiptap/extension-strike'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface StrikeOptions extends TiptapStrikeOptions, GeneralOptions {
  button: ButtonView
}

export const Strike = /* @__PURE__ */ TiptapStrike.extend<StrikeOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: defineAsyncComponent(() => import('@/components/EBtn/Index.vue')),
        componentProps: {
          action: () => editor.chain().focus().toggleStrike().run(),
          isActive: () => editor.isActive('strike') || false,
          icon: 'strike',
          tooltip: t('editor.strike.tooltip')
        }
      })
    }
  }
})
