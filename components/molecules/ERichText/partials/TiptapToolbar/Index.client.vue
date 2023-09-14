<script lang="ts">
import { VToolbar } from 'vuetify/components/VToolbar'
import { VSpacer } from 'vuetify/components/VGrid'
import { VDivider } from 'vuetify/components/VDivider'
import { Editor } from '@tiptap/vue-3'
import { ButtonViewReturn } from '~/utils/rich-text/constants/type'
import { isFunction } from '~/utils/rich-text/utils'

interface Menu {
  button: ButtonViewReturn
  divider: boolean
  spacer: boolean
}

export default defineComponent({
  name: 'TiptapToolbar',
  components: { VToolbar, VSpacer, VDivider },
  props: {
    editor: {
      type: Editor,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { t } = useI18n()

    const items = computed(() => {
      const extensions = [...props.editor.extensionManager.extensions]
      const sortExtensions = extensions.sort((arr) => {
        const a = arr.options.sort ?? -1
        const b = arr.options.sort ?? -1
        return a - b
      })

      let menus: Menu[] = []

      for (const extension of sortExtensions) {
        const { button, divider = false, spacer = false } = extension.options
        if (!button || !isFunction(button)) { continue }

        const _button: ButtonViewReturn = button({
          editor: props.editor,
          extension,
          t: unref(t)
        })

        if (Array.isArray(_button)) {
          const menu: Menu[] = _button.map((k, i) => ({
            button: k,
            divider: i === _button.length - 1 ? divider : false,
            spacer: i === 0 ? spacer : false
          }))
          menus = [...menus, ...menu]
        }
        menus.push({ button: _button, divider, spacer })
      }
      return menus
    })

    return { items }
  }
})
</script>

<template>
  <v-toolbar v-bind="$attrs" density="compact" flat height="auto" class="py-1 ps-1">
    <template v-for="(item, key) in items" :key="key">
      <v-spacer v-if="item.spacer" />
      <component
        :is="item.button.component"
        v-bind="item.button.componentProps"
        :editor="editor"
        :disabled="disabled"
        color="primary"
      />
      <v-divider v-if="item.divider" vertical class="mx-1 me-2" />
    </template>
  </v-toolbar>
</template>

<style scoped>

</style>
