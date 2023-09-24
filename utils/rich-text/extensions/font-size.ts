import { Extension } from '@tiptap/core'

import type { Item } from '@/components/molecules/ERichText/partials/EMenuBtn/Index.vue'

import { DEFAULT_FONT_SIZE_LIST, DEFAULT_FONT_SIZE_VALUUE } from '@/utils/rich-text/constants/define'
import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface FontSizeOptions extends GeneralOptions {
  button: ButtonView<FontSizeOptions>
  types: string[]
  fontSizes: number[]
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       */
      setFontSize: (fontSize: string) => ReturnType
      /**
       * Unset the font size
       */
      unsetFontSize: () => ReturnType
    }
  }
}

export const FontSize = /* @__PURE__ */ Extension.create<FontSizeOptions>({
  name: 'fontSize',

  addOptions() {
    return {
      ...this.parent?.(),
      types: ['textStyle'],
      fontSizes: DEFAULT_FONT_SIZE_LIST,
      button: ({ editor, extension, t }) => {
        const fontSizes = (extension.options?.fontSizes) || []

        const items: Item[] = [DEFAULT_FONT_SIZE_VALUUE, ...fontSizes].map(k => ({
          title: k === DEFAULT_FONT_SIZE_VALUUE ? t('editor.default') : String(k),
          isActive: () => {
            const { fontSize } = editor.getAttributes('textStyle')

            const isDefault = k === DEFAULT_FONT_SIZE_VALUUE
            const notFontSize = fontSize === undefined
            if (isDefault && notFontSize) {
              return true
            }

            return editor.isActive({ fontSize: String(k) }) || false
          },
          action: () => {
            if (k === DEFAULT_FONT_SIZE_VALUUE) {
              editor.chain().focus().unsetFontSize().run()
              return
            }

            editor.chain().focus().setFontSize(String(k)).run()
          },
          divider: k === DEFAULT_FONT_SIZE_VALUUE ?? false,
          default: k === DEFAULT_FONT_SIZE_VALUUE ?? false
        }))

        return {
          component: defineAsyncComponent(() => import('@/components/molecules/ERichText/partials/EMenuBtn/Index.vue')),
          componentProps: {
            icon: 'fontSize',
            tooltip: t('editor.fontSize.tooltip'),
            items,
            maxHeight: 280
          }
        }
      }
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize || '',
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {}
              }

              return {
                style: `font-size: ${attributes.fontSize}px`
              }
            }
          }
        }
      }
    ]
  },

  addCommands() {
    return {
      setFontSize:
        fontSize =>
          ({ chain }) => {
            return chain().setMark('textStyle', { fontSize }).run()
          },
      unsetFontSize:
        () =>
          ({ chain }) => {
            return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run()
          }
    }
  }
})
