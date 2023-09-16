import type { BulletListOptions as TiptapBulletListOptions } from '@tiptap/extension-bullet-list'
import { BulletList as TiptapBulletList } from '@tiptap/extension-bullet-list'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface BulletListOptions extends TiptapBulletListOptions, GeneralOptions {
  button: ButtonView
}

export const BulletList = /* @__PURE__ */ TiptapBulletList.extend<BulletListOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: defineAsyncComponent(() => import('@/components/EBtn/Index.vue')),
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
