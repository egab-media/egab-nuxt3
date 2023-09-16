import { Extension } from '@tiptap/core'

import type { ButtonView, GeneralOptions } from '@/utils/rich-text/constants/type'

export interface FullscreenOptions extends GeneralOptions {
  button: ButtonView
}

export const Fullscreen = /* @__PURE__ */ Extension.create<FullscreenOptions>({
  name: 'fullscreen',
  addOptions() {
    return {
      ...this.parent?.(),
      button: () => ({
        component: defineAsyncComponent(() => import('~/components/molecules/ERichText/partials/EFullscreenBtn/Index.client.vue')),
        componentProps: {}
      })
    }
  }
})
