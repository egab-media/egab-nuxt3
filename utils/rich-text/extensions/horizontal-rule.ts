import type { HorizontalRuleOptions as TiptapHorizontalRuleOptions } from '@tiptap/extension-horizontal-rule'
import { HorizontalRule as TiptapHorizontalRule } from '@tiptap/extension-horizontal-rule'

import ActionButton from '@/components/EBtn/Index.vue'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface HorizontalRuleOptions extends TiptapHorizontalRuleOptions, GeneralOptions {
  button: ButtonView
}

export const HorizontalRule = /* @__PURE__ */ TiptapHorizontalRule.extend<HorizontalRuleOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.setHorizontalRule(),
          icon: 'horizontalRule',
          tooltip: t('editor.horizontalrule.tooltip')
        }
      })
    }
  }
})
