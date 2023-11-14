<script lang="ts" setup>
import { mdiEye, mdiEyeOff } from '@mdi/js'

defineEmits(['update:modelValue'])
</script>

<script lang="ts">
export default defineComponent({
  name: 'ETextField',

  props: {
    id: {
      type: String,
      default: 'test'
    },
    hint: { type: String, default: undefined },
    persistentHint: { type: Boolean, default: false },
    modelValue: {
      type: String,
      default: ''
    },
    rules: {
      type: Array as () => Array<string>,
      default: () => []
    },
    type: {
      type: String,
      default: 'text'
    },
    loading: {
      type: Boolean,
      default: false
    },
    appendIcon: {
      type: String,
      default: ''
    },
    counter: { type: Boolean, default: false },
    counterValue: { type: Function, default: undefined }
  },

  data: () => ({
    showPass: false
  }),

})
</script>

<template>
  <v-text-field
    v-bind="$props"
    :id="id"
    :model-value="modelValue"
    :append-inner-icon="type === 'password' ? showPass ? mdiEye : mdiEyeOff : appendIcon"
    density="compact"
    :type="showPass ? 'text' : type"
    :flat="true"
    :title="id"
    variant="outlined"
    :rules="rules"
    @input="$emit('update:modelValue', $event.target.value)"
    @click:append-inner="showPass = !showPass"
  >
    <template
      v-for="(_, inputSlot) in $slots"
      #[inputSlot]="slotScope"
    >
      <slot
        :name="inputSlot"
        v-bind="slotScope"
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
  </v-text-field>
</template>

<style scoped>

</style>
