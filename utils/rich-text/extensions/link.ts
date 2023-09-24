import type { LinkOptions as TiptapLinkOptions } from '@tiptap/extension-link'
import { Link as TiptapLink } from '@tiptap/extension-link'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface LinkOptions extends TiptapLinkOptions, GeneralOptions {
  button: ButtonView
}

export const Link = /* @__PURE__ */ TiptapLink.extend<LinkOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: true,
      button: ({ editor, t }) => ({
        component: defineAsyncComponent(() => import('@/components/molecules/ERichText/partials/ELinkBtn/Index.client.vue')),
        componentProps: {
          isActive: () => editor.isActive('link') || false,
          icon: 'link',
          tooltip: t('editor.link.tooltip')
        }
      })
    }
  }
})
