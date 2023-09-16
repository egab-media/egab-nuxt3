import type { BulletListOptions as TiptapBulletListOptions } from '@tiptap/extension-bullet-list'
import { BulletList as TiptapBulletList } from '@tiptap/extension-bullet-list'

import ActionButton from '@/components/EBtn/Index.vue'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface BulletListOptions extends TiptapBulletListOptions, GeneralOptions {
  button: ButtonView
}

export const BulletList = /* @__PURE__ */ TiptapBulletList.extend<BulletListOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleBulletList().run(),
          isActive: () => editor.isActive('bulletList') || false,
          icon: 'bulletList',
          tooltip: t('editor.bulletlist.tooltip')
        }
      })
    }
  }
})
