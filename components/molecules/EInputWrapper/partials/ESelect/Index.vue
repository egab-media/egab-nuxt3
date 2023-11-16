<script lang="ts" setup>
defineEmits(['input'])
const handleUpdateMenu = (open: boolean) => {
  if (open) {
    setTimeout(
      () => window.dispatchEvent(new Event('resize')),
      100
    )
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
    },
    itemValue: {
      type: String,
      default: undefined
    },
    itemText: {
      type: String,
      default: undefined
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    menuProps: {
      type: Object,
      default: () => ({})
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
    density="compact"
    :item-value="itemValue"
    :item-text="itemText"
    @update:model-value="$emit('input', $event)"
    @update:menu="handleUpdateMenu"
  >
    <template
      v-for="(_, inputSlot) in $slots"
      #[inputSlot]="slotScope"
    >
      <slot
        :name="inputSlot"
        v-bind="{ ...slotScope }"
      />
    </template>

    <template #label="{label}">
      <span
        v-if="rules.includes('required')"
        data-test="input-asterisk"
        class="red--text"
        v-text="'* '"
      />
      <span
        data-test="input-label"
        v-text="label"
      />
    </template>
  </v-select>
</template>

<style scoped>

</style>
