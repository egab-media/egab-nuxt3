import type { Extension } from '@tiptap/core'
import type { HeadingOptions as TiptapHeadingOptions } from '@tiptap/extension-heading'
import { Heading as TiptapHeading } from '@tiptap/extension-heading'

import type { BaseKitOptions } from './base-kit'
import type { Item } from '@/components/molecules/ERichText/partials/EMenuBtn/Index.vue'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface HeadingOptions extends TiptapHeadingOptions, GeneralOptions {
  button: ButtonView<HeadingOptions>
}

export const Heading = /* @__PURE__ */ TiptapHeading.extend<HeadingOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      levels: [1, 2, 3, 4, 5, 6],
      button: ({ editor, extension, t }) => {
        const { extensions = [] } = editor.extensionManager ?? []
        const levels = extension.options?.levels || []
        const baseKitExt = extensions.find(k => k.name === 'base-kit') as Extension<BaseKitOptions>

        const items: Item[] = levels.map(level => ({
          action: () => editor.chain().focus().toggleHeading({ level }).run(),
          isActive: () => editor.isActive('heading', { level }) || false,
          icon: `h${level}`,
          title: t(`editor.heading.h${level}.tooltip`)
        }))

        if (baseKitExt && baseKitExt.options.paragraph !== false) {
          items.unshift({
            action: () => editor.chain().focus().setParagraph().run(),
            isActive: () => editor.isActive('paragraph') || false,
            icon: 'p',
            title: t('editor.paragraph.tooltip'),
            divider: true
          })
        }

        return {
          component: defineAsyncComponent(() => import('@/components/molecules/ERichText/partials/EMenuBtn/Index.vue')),
          componentProps: {
            icon: 'heading',
            tooltip: t('editor.heading.tooltip'),
            items
          }
        }
      }
    }
  }
})
