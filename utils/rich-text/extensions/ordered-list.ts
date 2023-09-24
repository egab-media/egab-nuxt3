import type { OrderedListOptions as TiptapOrderedListOptions } from '@tiptap/extension-ordered-list'
import { OrderedList as TiptapOrderedList } from '@tiptap/extension-ordered-list'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface OrderedListOptions extends TiptapOrderedListOptions, GeneralOptions {
  button: ButtonView
}

export const OrderedList = /* @__PURE__ */ TiptapOrderedList.extend<OrderedListOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: defineAsyncComponent(() => import('@/components/EBtn/Index.vue')),
        componentProps: {
          action: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: () => editor.isActive('orderedList') || false,
          icon: 'orderedList',
          tooltip: t('editor.orderedlist.tooltip')
        }
      })
    }
  }
})
