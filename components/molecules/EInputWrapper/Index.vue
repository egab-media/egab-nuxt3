<script lang="ts">
export default defineComponent({
  name: 'EInputWrapper',
  props: {
    componentName: {
      type: String,
      default: 'text',
      validator: value => value === 'text'
    },
    modelValue: {
      type: [String, Number, Object, Array],
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup(props, { expose }) {
    const textField = resolveComponent('lazy-molecules-e-input-wrapper-partials-e-text-field')
    // TODO: check vuetify open issue for select menus before using all dropdowns
    // check issue on Github: https://github.com/SAP/inquirer-gui/issues/651
    // https://github.com/vuetifyjs/vuetify/issues/17126
    // const select = resolveComponent('lazy-molecules-e-input-wrapper-partials-e-select')

    const getComponent = computed(() => {
      switch (props.componentName) {
        case 'text':
          return textField
      }
    })
    // NOTE: It is important to expose the modelValue props to the grand parent
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
