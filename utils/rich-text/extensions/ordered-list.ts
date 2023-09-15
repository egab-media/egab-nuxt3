import type { OrderedListOptions as TiptapOrderedListOptions } from '@tiptap/extension-ordered-list'
import { OrderedList as TiptapOrderedList } from '@tiptap/extension-ordered-list'

import ActionButton from '@/components/EBtn/Index.vue'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface OrderedListOptions extends TiptapOrderedListOptions, GeneralOptions {
  button: ButtonView
}

export const OrderedList = /* @__PURE__*/ TiptapOrderedList.extend<OrderedListOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleOrderedList(),
          isActive: () => editor.isActive('orderedList') || false,
          icon: 'orderedList',
          tooltip: t('editor.orderedlist.tooltip')
        }
      })
    }
  }
})
