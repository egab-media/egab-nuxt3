<script lang="ts">
export default defineComponent({
  name: 'EInputWrapper',
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text',
      validator: (value: string) => ['text', 'textarea', 'email', 'password', 'select'].includes(value)
    },
    modelValue: {
      type: [String, Number, Object, Array],
      default: null
    },
    label: {
      type: String,
      default: undefined
    },
    cols: {
      type: [String, Number],
      default: 12
    }
  },
  emits: ['update:modelValue'],
  setup(props, { expose }) {
    const textField = resolveComponent('lazy-molecules-e-input-wrapper-partials-e-text-field')
    const textArea = resolveComponent('lazy-molecules-e-input-wrapper-partials-e-textarea')
    const select = resolveComponent('lazy-molecules-e-input-wrapper-partials-e-select')

    const getComponent = computed(() => {
      switch (props.type) {
        case 'text':
          return textField
        case 'textarea':
          return textArea
        case 'password':
          return textField
        case 'email':
          return textField
        case 'select':
          return select
      }
    })
    // NOTE: It is important to expose the modelValue props to the grandparent
    expose({ modelValue: props.modelValue })
    return { textField, getComponent }
  }
})
</script>

<template>
  <v-col :cols="cols">
    <component
      :is="getComponent"
      v-bind="$props"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </v-col>
</template>

<style scoped>

</style>
