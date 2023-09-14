import { Node } from '@tiptap/core'

import ActionButton from '@/components/EBtn/Index.vue'

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
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
          icon: 'clear',
          tooltip: t('editor.clear.tooltip')
        }
      })
    }
  }
})
