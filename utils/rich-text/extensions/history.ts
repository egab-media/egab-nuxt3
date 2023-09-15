import type { HistoryOptions as TiptapHistoryOptions } from '@tiptap/extension-history'
import { History as TiptapHistory } from '@tiptap/extension-history'

import ActionButton from '@/components/EBtn/Index.vue'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface HistoryOptions extends TiptapHistoryOptions, GeneralOptions {
  button: ButtonView
}

export const History = /* @__PURE__*/ TiptapHistory.extend<HistoryOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      depth: 10,
      button: ({ editor, t }) => {
        const historys: ['undo', 'redo'] = ['undo', 'redo']

        return historys.map(item => ({
          component: ActionButton,
          componentProps: {
            action: () => {
              if (item === 'undo') editor.commands.undo()
              if (item === 'redo') editor.commands.redo()
            },
            icon: item,
            tooltip: t(`editor.${item}.tooltip`)
          }
        }))
      }
    }
  }
})
