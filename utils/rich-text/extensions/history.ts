import type { HistoryOptions as TiptapHistoryOptions } from '@tiptap/extension-history'
import { History as TiptapHistory } from '@tiptap/extension-history'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface HistoryOptions extends TiptapHistoryOptions, GeneralOptions {
  button: ButtonView
}

export const History = /* @__PURE__ */ TiptapHistory.extend<HistoryOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      depth: 10,
      button: ({ editor, t }) => {
        const historys: ['undo', 'redo'] = ['undo', 'redo']

        return historys.map(item => ({
          component: defineAsyncComponent(() => import('@/components/EBtn/Index.vue')),
          componentProps: {
            action: () => {
              if (item === 'undo') { editor.chain().focus().undo().run() }
              if (item === 'redo') { editor.chain().focus().redo().run() }
            },
            icon: item,
            tooltip: t(`editor.${item}.tooltip`)
          }
        }))
      }
    }
  }
})
