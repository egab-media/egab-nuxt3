<script lang="ts">
import { Editor } from '@tiptap/vue-3'
import { getIcon, IconsOptions } from '~/utils/rich-text/constants/icons'
import { StyleValue } from '@vue/runtime-dom'
import { ButtonViewReturnComponentProps } from '~/utils/rich-text/constants/type'
import { VMenu } from 'vuetify/components/VMenu'
import { VList, VListItem, VListItemTitle } from 'vuetify/components/VList'
import { VIcon } from 'vuetify/components/VIcon'
import { VDivider } from 'vuetify/components/VDivider'

export interface Item {
  title: string | undefined
  icon?: keyof IconsOptions
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>
  action?: ButtonViewReturnComponentProps['action']
  style?: StyleValue
  divider?: boolean
  default?: boolean
}

export default defineComponent({
  name: 'EMenuBtn',
  components: {
    VMenu,
    VList,
    VListItem,
    VIcon,
    VListItemTitle,
    VDivider
  },
  props: {
    editor: {
      type: Object as () => Editor,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: undefined
    },
    maxHeight: {
      type: [String, Number],
      default: undefined
    },
    icon: {
      type: String as () => keyof IconsOptions,
      default: undefined
    },
    tooltip: {
      type: String,
      default: undefined
    },
    items: {
      type: Array as () => Item[],
      default: () => []
    }
  },
  setup(props, {}) {
    const menu = ref(false)
    const active = computed<Item>(() => {
      const find = props.items.find(k => k.isActive())
      if (find && !find.default) {
        return {
          ...find,
          icon: find.icon ? find.icon : props.icon
        }
      }
      const item: Item = {
        title: props.tooltip,
        icon: props.icon,
        isActive: () => false
      }
      return item
    })
    return { menu, active, getIcon }
  }
})
</script>

<template>
  <e-btn
    :icon="active.icon"
    :tooltip="active.title"
    :disabled="disabled"
    :color="color"
    :is-active="active.isActive"
  >
    <v-menu v-model="menu" activator="parent">
      <v-list density="compact" :max-height="maxHeight">
        <template v-for="(item, i) in items" :key="i">
          <v-list-item :active="item.isActive()" @click="item.action">
            <template #prepend>
              <v-icon v-if="item.icon" :icon="getIcon(item.icon)" />
            </template>

            <v-list-item-title :style="item.style">{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-divider v-if="item.divider" />
        </template>
      </v-list>
    </v-menu>
  </e-btn>
</template>

<style scoped>

</style>
