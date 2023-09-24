import { Extension } from '@tiptap/core'

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
          component: defineAsyncComponent(() => import('@/components/EBtn/Index.vue')),
          componentProps: {
            action: () => {
              if (item === 'indent') { editor.chain().focus().sinkListItem('listItem').run() }
              if (item === 'outdent') { editor.chain().focus().liftListItem('listItem').run() }
            },
            icon: item,
            tooltip: t(`editor.${item}.tooltip`)
          }
        }))
      }
    }
  }
})
