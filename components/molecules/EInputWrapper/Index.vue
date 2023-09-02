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
  setup(props, { emit }) {
    const textField = resolveComponent('lazy-molecules-e-input-wrapper-partials-e-text-field')
    // TODO: check vuetify open issue for select menus before using all dropdowns
    // const select = resolveComponent('lazy-molecules-e-input-wrapper-partials-e-select')

    const handleInput = (e: any) => {
      emit('update:modelValue', e?.target?.value || e)
    }

    const getComponent = computed(() => {
      switch (props.componentName) {
        case 'text':
          return textField
      }
    })
    return { textField, getComponent, handleInput }
  }
})
</script>

<template>
  <component
    :is="getComponent"
    v-bind="$props"
    :value="modelValue"
    @input="handleInput"
    @change="handleInput"
  />
</template>

<style scoped>

</style>
