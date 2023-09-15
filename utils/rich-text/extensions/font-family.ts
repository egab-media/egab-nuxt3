import type { FontFamilyOptions as TiptapFontFamilyOptions } from '@tiptap/extension-font-family'
import { FontFamily as TiptapFontFamily } from '@tiptap/extension-font-family'

import type { Item } from '@/components/molecules/ERichText/partials/EMenuBtn/Index.vue'
import ActionMenuButton from '@/components/molecules/ERichText/partials/EMenuBtn/Index.vue'

import type { FontFamilyProps } from '@/utils/rich-text/constants/define'
import { DEFAULT_FONT_FAMILY_LIST, DEFAULT_FONT_FAMILY_VALUE } from '@/utils/rich-text/constants/define'
import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface FontFamilyOptions extends TiptapFontFamilyOptions, GeneralOptions {
  button: ButtonView<FontFamilyOptions>
  fontFamilies: FontFamilyProps[]
}

export const FontFamily = /* @__PURE__ */ TiptapFontFamily.extend<FontFamilyOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      fontFamilies: DEFAULT_FONT_FAMILY_LIST,
      button: ({ editor, extension, t }) => {
        const fontFamilies = (extension.options?.fontFamilies as FontFamilyProps[]) || []

        const items: Item[] = fontFamilies.map(k => ({
          title: t(`editor.fonts.${k.title.toLowerCase()}`),
          isActive: () => {
            const { fontFamily } = editor.getAttributes('textStyle')
            const isDefault = k.value === DEFAULT_FONT_FAMILY_VALUE
            const notFontFamily = fontFamily === undefined
            if (isDefault && notFontFamily) {
              return true
            }

            return editor.isActive({ fontFamily: k.value }) || false
          },
          action: () => {
            if (k.value === DEFAULT_FONT_FAMILY_VALUE) {
              editor.commands.unsetFontFamily()
              return
            }

            editor.commands.setFontFamily(k.value)
          },
          style: { fontFamily: k.value },
          divider: k.divider ?? false,
          default: k.default ?? false
        }))

        return {
          component: ActionMenuButton,
          componentProps: {
            icon: 'fontFamily',
            tooltip: t('editor.fontFamily.tooltip'),
            items,
            maxHeight: 280
          }
        }
      }
    }
  }
})
