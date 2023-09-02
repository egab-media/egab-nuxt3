<script lang="ts" setup>
import { VSelect } from 'vuetify/components/VSelect'
defineEmits(['input'])
const handleUpdateMenu = (open: boolean) => {
  if (open) {
    setTimeout(() => window.dispatchEvent(new Event('resize')), 50)
  }
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'ESelect',
  props: {
    modelValue: {
      type: [Object, String, Array, Number],
      required: true
    },
    items: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Array as () => Array<string>,
      default: () => []
    },
    id: {
      type: String,
      default: 'select'
    }
  }
})
</script>

<template>
  <v-select
    v-bind="$props"
    :id="id"
    :model-value="modelValue"
    :eager="true"
    dense
    density="compact"
    @update:model-value="$emit('input', $event)"
    @update:menu="handleUpdateMenu"
  >
    <template
      v-for="(_, inputSlot) in $slots"
      #[inputSlot]="slotScope"
    >
      <slot :name="inputSlot" v-bind="slotScope" />
    </template>

    <template #label="{label}">
      <span v-if="rules.includes('required')" data-test="input-asterisk" class="red--text" v-text="'* '" />
      <span data-test="input-label" v-text="label" />
    </template>
  </v-select>
</template>

<style scoped>

</style>
