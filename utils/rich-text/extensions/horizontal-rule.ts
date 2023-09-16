import type { HorizontalRuleOptions as TiptapHorizontalRuleOptions } from '@tiptap/extension-horizontal-rule'
import { HorizontalRule as TiptapHorizontalRule } from '@tiptap/extension-horizontal-rule'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface HorizontalRuleOptions extends TiptapHorizontalRuleOptions, GeneralOptions {
  button: ButtonView
}

export const HorizontalRule = /* @__PURE__ */ TiptapHorizontalRule.extend<HorizontalRuleOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: defineAsyncComponent(() => import('@/components/EBtn/Index.vue')),
        componentProps: {
          action: () => editor.chain().focus().setHorizontalRule().run(),
          icon: 'horizontalRule',
          tooltip: t('editor.horizontalrule.tooltip')
        }
      })
    }
  }
})
