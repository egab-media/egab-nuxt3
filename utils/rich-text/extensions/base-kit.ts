// StarterKit
import type { AnyExtension } from '@tiptap/core'
import { Extension } from '@tiptap/core'
import type { CharacterCountOptions } from '@tiptap/extension-character-count'
import { CharacterCount } from '@tiptap/extension-character-count'
import { Document } from '@tiptap/extension-document'
import type { DropcursorOptions } from '@tiptap/extension-dropcursor'
import { Dropcursor } from '@tiptap/extension-dropcursor'
import type { FocusOptions } from '@tiptap/extension-focus'
import Focus from '@tiptap/extension-focus'
import { Gapcursor } from '@tiptap/extension-gapcursor'
import type { HardBreakOptions } from '@tiptap/extension-hard-break'
import { HardBreak } from '@tiptap/extension-hard-break'
import type { ListItemOptions } from '@tiptap/extension-list-item'
import { ListItem } from '@tiptap/extension-list-item'
import type { ParagraphOptions } from '@tiptap/extension-paragraph'
import { Paragraph } from '@tiptap/extension-paragraph'
import type { PlaceholderOptions } from '@tiptap/extension-placeholder'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Text } from '@tiptap/extension-text'
import type { TextStyleOptions } from '@tiptap/extension-text-style'
import { TextStyle } from '@tiptap/extension-text-style'

import type { BubbleOptions } from './components/bubble'
import { defaultBubbleList, generateBubbleTypeMenu } from './components/bubble'

import { NODE_TYPE_MENU } from '~/utils/rich-text/constants/define'

export interface BaseKitOptions {
  document: false
  dropcursor: Partial<DropcursorOptions> | false
  gapcursor: false
  characterCount: Partial<CharacterCountOptions> | false
  hardBreak: Partial<HardBreakOptions> | false
  text: any
  placeholder: Partial<PlaceholderOptions> | false
  paragraph: Partial<ParagraphOptions> | false
  focus: Partial<FocusOptions> | false
  listItem: Partial<ListItemOptions> | false
  bubble: Partial<BubbleOptions<BaseKitOptions>>
  textStyle: Partial<TextStyleOptions> | false
}

export const BaseKit = /* @__PURE__*/ Extension.create<BaseKitOptions>({
  name: 'base-kit',

  addOptions() {
    return {
      ...this.parent?.(),
      bubble: {
        list: NODE_TYPE_MENU,
        defaultBubbleList,
        button: ({ editor, extension, t }) => {
          const { list = {}, defaultBubbleList } = extension.options?.bubble ?? {}
          const defaultList = defaultBubbleList?.(editor) ?? []
          return generateBubbleTypeMenu(list, defaultList, { editor, extension, t })
        }
      }
    }
  },

  addExtensions() {
    const extensions: AnyExtension[] = []

    if (this.options.placeholder !== false) {
      extensions.push(
        Placeholder.configure({
          placeholder: '',
          ...this.options.placeholder
        })
      )
    }

    if (this.options.focus !== false) {
      extensions.push(
        Focus.configure({
          className: 'focus',
          ...this.options.focus
        })
      )
    }

    if (this.options.document !== false) {
      extensions.push(Document.configure(this.options.document))
    }

    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure(this.options.dropcursor))
    }

    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor.configure(this.options.gapcursor))
    }

    if (this.options.characterCount !== false) {
      extensions.push(CharacterCount.configure(this.options.characterCount))
    }

    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options.paragraph))
    }

    if (this.options.hardBreak !== false) {
      extensions.push(HardBreak.configure(this.options.hardBreak))
    }

    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options.text))
    }

    if (this.options.listItem !== false) {
      extensions.push(ListItem.configure(this.options.listItem))
    }

    if (this.options.textStyle !== false) {
      extensions.push(TextStyle.configure(this.options.textStyle))
    }

    return extensions
  }
})
