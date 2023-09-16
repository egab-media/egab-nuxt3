import { Node } from '@tiptap/core'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface ClearOptions extends GeneralOptions {
  button: ButtonView
}

export const Clear = /* @__PURE__ */ Node.create<ClearOptions>({
  name: 'clear',
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: defineAsyncComponent(() => import('@/components/EBtn/Index.vue')),
        componentProps: {
          action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
          icon: 'clear',
          tooltip: t('editor.clear.tooltip')
        }
      })
    }
  }
})
