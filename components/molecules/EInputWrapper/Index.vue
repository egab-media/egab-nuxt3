<script lang="ts">
export default defineComponent({
  name: 'EInputWrapper',
  props: {
    type: {
      type: String,
      default: 'text',
      validator: value => value === 'text'
    },
    modelValue: {
      type: [String, Number, Object, Array],
      default: null
    },
    label: {
      type: String,
      default: undefined
    }
  },
  emits: ['update:modelValue'],
  setup(props, { expose }) {
    const textField = resolveComponent('lazy-molecules-e-input-wrapper-partials-e-text-field')
    // TODO: check vuetify open issue for select menus before using all dropdowns
    // const select = resolveComponent('lazy-molecules-e-input-wrapper-partials-e-select')

    const getComponent = computed(() => {
      switch (props.type) {
        case 'text':
          return textField
      }
    })
    // NOTE: It is important to expose the modelValue props to the grandparent
    expose({ modelValue: props.modelValue })
    return { textField, getComponent }
  }
})
</script>

<template>
  <component
    :is="getComponent"
    v-bind="$props"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<style scoped>

</style>
