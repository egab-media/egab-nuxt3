<script lang="ts">
import { storeToRefs } from 'pinia'
import { RouteLocationRaw } from 'vue-router'
import { useLanguageStore } from '~/store/language'
import { ButtonViewReturnComponentProps } from '~/utils/rich-text/constants/type'
import { getIcon, IconsOptions } from '~/utils/rich-text/constants/icons'
import { isString } from '~/utils/rich-text/utils'

export default defineComponent({
  name: 'EBtn',
  props: {
    dataTest: {
      type: String,
      default: 'btn',
    },
    icon: {
      type: [String as () => keyof IconsOptions, Boolean],
      default: undefined,
    },
    // adds color
    color: {
      type: String,
      default: null,
    },
    variant: {
      type: String as NonNullable<any>,
      default: 'elevated',
      validator: (value: string) => [
        'elevated',
        'outlined',
        'plain',
        'tonal',
        'flat',
        'text',
      ].includes(value),
    },
    size: {
      type: [String],
    },
    depressed: {
      type: Boolean,
      default: false,
    },
    google: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    fab: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: 'egab button',
    },
    block: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    xLarge: {
      type: Boolean,
      default: false,
    },
    xSmall: {
      type: Boolean,
      default: false,
    },
    link: {
      type: Boolean,
      default: false,
    },
    nuxt: {
      type: Boolean,
      default: false,
    },
    to: {
      type: [String as () => RouteLocationRaw, Object as () => RouteLocationRaw],
      default: undefined,
    },
    removePadding: {
      type: Boolean,
      default: false,
    },
    underline: {
      type: Boolean,
      default: false,
    },
    iconName: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: undefined,
    },
    width: {
      type: [String, Number],
      default: null,
    },
    height: {
      type: [String, Number],
      default: null,
    },
    title: {
      type: String,
      default: undefined,
    },
    action: {
      type: Function as ButtonViewReturnComponentProps['action'],
      default: undefined,
    },
    isActive: {
      type: Function,
      default: undefined,
    },
    tooltip: {
      type: String,
      default: undefined,
    },
  },
  emits: ['click'],
  setup() {
    const languageStore = useLanguageStore()
    const {getDir} = storeToRefs(languageStore)
    return {getDir}
  },
  data: () => ({}),
  computed: {
    btnIcon() {
      if (isString(this.icon)) {
        return getIcon(this.icon)
      }
      return null
    },
  },
})
</script>

<template>
  <v-btn
    :data-test="dataTest"
    :color="color"
    :depressed="depressed"
    :icon="icon"
    :outlined="outlined"
    :plain="plain"
    :rounded="rounded"
    :variant="variant"
    :fab="fab"
    :dark="dark"
    :block="block"
    :disabled="disabled"
    :large="large"
    :loading="loading"
    :small="small"
    :x-large="xLarge"
    :x-small="xSmall"
    :link="link"
    :to="to"
    :nuxt="nuxt"
    :href="href"
    :width="width"
    :height="height"
    :title="title"
    class="text-body-1 text-capitalize font-weight-thin"
    :class="
      underline ? 'text-decoration-underline pa-0' : removePadding ? 'pa-0' : isActive?.() ? 'v-btn--active' : ''
    "
    @click="action ? action() : $emit('click', $event)"
  >
    <v-icon
      v-if="btnIcon"
      :left="
        !(fab || icon) && getDir($i18n.locale) && getDir($i18n.locale) === 'ltr'
      "
      :icon="btnIcon"
    />

    <v-tooltip
      :eager="false"
      activator="parent"
      location="top"
      :text="tooltip"
    />

    <!-- custom icon here -->
    <slot />

    {{ !(fab || icon) ? text : '' }}
  </v-btn>
</template>

<style scoped>

</style>
