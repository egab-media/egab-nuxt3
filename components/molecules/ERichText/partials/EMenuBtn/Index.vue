<script lang="ts">
import { Editor } from '@tiptap/vue-3'
import { StyleValue } from 'vue'
import { ButtonViewReturnComponentProps } from '~/utils/rich-text/constants/type'
import { getIcon, IconsOptions } from '~/utils/rich-text/constants/icons'

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
  setup(props) {
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
    <v-menu
      v-model="menu"
      activator="parent"
      attach="#content"
    >
      <v-list
        density="compact"
        :max-height="maxHeight"
      >
        <template
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item
            :active="item.isActive()"
            @click="item.action"
          >
            <template #prepend>
              <v-icon
                v-if="item.icon"
                :icon="getIcon(item.icon)"
              />
            </template>

            <v-list-item-title :style="item.style">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
          <v-divider v-if="item.divider" />
        </template>
      </v-list>
    </v-menu>
  </e-btn>
</template>

<style scoped>

</style>
