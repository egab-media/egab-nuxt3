<script lang="ts">
import { COLORS_LIST } from '~/utils/rich-text/constants/define'
import { getIcon } from '~/utils/rich-text/constants/icons'

export default defineComponent({
  name: 'EColorPicker',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    nudgeLeft: {
      type: [String, Number],
      default: 0
    },
    nudgeTop: {
      type: [String, Number],
      default: 0
    },
    more: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(_, { emit, expose }) {
    const menu = ref(false)
    const setColor = (color: string) => {
      emit('update:modelValue', color)
      emit('change', color)
      menu.value = false
    }
    expose({ menu, setColor, COLORS_LIST, getIcon })
    return { menu, setColor, COLORS_LIST, getIcon }
  }
})
</script>

<template>
  <v-menu
    v-model="menu"
    :nudge-left="nudgeLeft"
    :nudge-top="nudgeTop"
    :close-on-content-click="false"
    transition="scale-transition"
    :origin="!nudgeLeft ? 'top right' : 'top left'"
    activator="parent"
    attach="#content"
    :width="230"
  >
    <v-list>
      <v-sheet
        class="d-flex flex-wrap justify-between ma-1"
        fluid
        :max-width="230"
      >
        <v-btn
          v-for="color in COLORS_LIST"
          :key="color"
          density="compact"
          flat
          icon
          @click="setColor(color)"
        >
          <v-icon
            :icon="getIcon('circle')"
            :color="color"
          />
        </v-btn>
      </v-sheet>
    </v-list>
  </v-menu>
</template>

<style scoped>

</style>
