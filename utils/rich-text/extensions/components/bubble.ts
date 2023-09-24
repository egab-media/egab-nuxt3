import { deleteSelection } from '@tiptap/pm/commands'
import type { Editor } from '@tiptap/vue-3'

import type { Display } from './image/types'
import EBtn from '@/components/EBtn/Index.vue'

import { IMAGE_SIZE, VIDEO_SIZE } from '~/utils/rich-text/constants/define'
import type { ButtonViewParams, ButtonViewReturn, ExtensionNameKeys } from '~/utils/rich-text/constants/type'

type BubbleImageFloatType = 'float-left' | 'float-none' | 'float-right'
type BubbleImageOrVideoSizeType = 'size-small' | 'size-medium' | 'size-large'
type BubbleImageType =
  | BubbleImageFloatType
  | `image-${BubbleImageOrVideoSizeType}`
  | `video-${BubbleImageOrVideoSizeType}`
  | 'image'
  | 'image-aspect-ratio'
  | 'remove'

type BubbleVideoType = 'video' | 'remove'
type BubbleType = BubbleImageType | BubbleVideoType
type BubbleAllType = BubbleType | ExtensionNameKeys | 'divider'

export interface BubbleMenuItem extends ButtonViewReturn {
  type: BubbleAllType
}

export type NodeTypeKey = 'image' | 'text' | 'video'
export type BubbleTypeMenu = Partial<Record<NodeTypeKey, BubbleMenuItem[]>>
export type NodeTypeMenu = Partial<Record<NodeTypeKey, BubbleAllType[]>>

interface BubbleView<T = any> {
  (options: ButtonViewParams<T>): BubbleTypeMenu
}

export const defaultBubbleList = (editor: Editor): BubbleMenuItem[] => [
  ...imageFloatMenus(editor),
  ...imageSizeMenus(editor),
  ...videoSizeMenus(editor),
  {
    type: 'image-aspect-ratio',
    component: EBtn,
    componentProps: {
      tooltip: 'editor.image.dialog.form.aspectRatio',
      icon: 'aspectRatio',
      action: () => {
        const isLock = editor.isActive('image', { lockAspectRatio: true })
        // @ts-ignore
        editor.commands.updateImage({
          lockAspectRatio: !isLock,
          height: isLock ? undefined : null
        })
      },
      isActive: () => editor.isActive('image', { lockAspectRatio: true })
    }
  },
  {
    type: 'remove',
    component: EBtn,
    componentProps: {
      tooltip: 'editor.remove',
      icon: 'delete',
      action: () => {
        const { state, dispatch } = editor.view
        deleteSelection(state, dispatch)
      }
    }
  }
]

export interface BubbleOptions<T> {
  list: NodeTypeMenu
  defaultBubbleList: typeof defaultBubbleList
  button: BubbleView<T>
}

const imageFloatMenus = (editor: Editor): BubbleMenuItem[] => {
  const types: BubbleImageFloatType[] = ['float-left', 'float-none', 'float-right']
  const icons: NonNullable<ButtonViewReturn['componentProps']['icon']>[] = [
    'formatFloatLeft',
    'formatFloatNone',
    'formatFloatRight'
  ]
  const display: Display[] = ['left', 'inline', 'right']

  return types.map((float, i) => ({
    type: float,
    component: EBtn,
    componentProps: {
      tooltip: `editor.image.${float.replace('-', '.')}.tooltip`,
      icon: icons[i],
      // @ts-ignore
      action: () => editor.commands.updateImage({ display: display[i] }),
      isActive: () => editor.isActive('image', { display: display[i] })
    }
  }))
}

const imageSizeMenus = (editor: Editor): BubbleMenuItem[] => {
  const types: BubbleImageOrVideoSizeType[] = ['size-small', 'size-medium', 'size-large']
  const icons: NonNullable<ButtonViewReturn['componentProps']['icon']>[] = ['sizeS', 'sizeM', 'sizeL']

  return types.map((size, i) => ({
    type: `image-${size}`,
    component: EBtn,
    componentProps: {
      tooltip: `editor.${size.replace('-', '.')}.tooltip`,
      icon: icons[i],
      // @ts-ignore
      action: () => editor.commands.updateImage({ width: IMAGE_SIZE[size], height: null }),
      isActive: () => editor.isActive('image', { width: IMAGE_SIZE[size] })
    }
  }))
}

const videoSizeMenus = (editor: Editor): BubbleMenuItem[] => {
  const types: BubbleImageOrVideoSizeType[] = ['size-small', 'size-medium', 'size-large']
  const icons: NonNullable<ButtonViewReturn['componentProps']['icon']>[] = ['sizeS', 'sizeM', 'sizeL']

  return types.map((size, i) => ({
    type: `video-${size}`,
    component: EBtn,
    componentProps: {
      tooltip: `editor.${size.replace('-', '.')}.tooltip`,
      icon: icons[i],
      // @ts-ignore
      action: () => editor.commands.updateVideo({ width: VIDEO_SIZE[size] }),
      isActive: () => editor.isActive('video', { width: VIDEO_SIZE[size] })
    }
  }))
}
/**
 * Generate bubble menu
 * @template T
 * @param {NodeTypeMenu} list
 * @param {BubbleMenuItem[]} defaultList
 * @param {ButtonViewParams<T>} { editor, extension, t }
 * @return {*}  {BubbleTypeMenu}
 */
export const generateBubbleTypeMenu = <T = any>(
  list: NodeTypeMenu,
  defaultList: BubbleMenuItem[],
  { editor, t }: ButtonViewParams<T>
): BubbleTypeMenu => {
  const { extensions = [] } = editor.extensionManager

  const items: BubbleTypeMenu = {}

  for (const node of Object.keys(list)) {
    const nodeType = list[node as NodeTypeKey]
    if (!nodeType) { continue }

    const _items: BubbleMenuItem[] = []

    for (const ext of nodeType) {
      if (ext === 'divider') {
        const lastItem = _items[_items.length - 1]
        if (lastItem?.type === 'divider') { continue }

        _items.push({
          type: 'divider',
          component: undefined,
          componentProps: {}
        })
        continue
      }

      const find = defaultList.find(k => k.type === ext)
      if (find) {
        _items.push({
          ...find,
          componentProps: {
            ...find.componentProps,
            tooltip: find.componentProps.tooltip ? t(find.componentProps.tooltip) : undefined
          }
        })
        continue
      }

      const findExt = extensions.find(k => k.name === ext)
      if (findExt) {
        const { button } = findExt.options as any
        const _button: ButtonViewReturn = button({ editor, extension: findExt, t })

        _items.push({
          type: ext,
          component: _button.component,
          componentProps: _button.componentProps
        })
        continue
      }
    }

    const lastItem = _items[_items.length - 1]
    const fristItem = _items[0]

    if (lastItem?.type === 'divider') { _items.pop() }
    if (fristItem?.type === 'divider') { _items.shift() }

    items[node as NodeTypeKey] = _items
  }

  return items
}
