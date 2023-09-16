import { Extension } from '@tiptap/core'

import ActionButton from '@/components/EBtn/Index.vue'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface IndentOptions extends GeneralOptions {
  button: ButtonView
}

export const Indent = /* @__PURE__ */ Extension.create<IndentOptions>({
  name: 'indent',
  addOptions() {
    return {
      divider: false,
      spacer: false,
      button: ({ editor, t }) => {
        const items: ['indent', 'outdent'] = ['indent', 'outdent']

        return items.map(item => ({
          component: ActionButton,
          componentProps: {
            action: () => {
              if (item === 'indent') { editor.commands.sinkListItem('listItem') }
              if (item === 'outdent') { editor.commands.liftListItem('listItem') }
            },
            icon: item,
            tooltip: t(`editor.${item}.tooltip`)
          }
        }))
      }
    }
  }
})
