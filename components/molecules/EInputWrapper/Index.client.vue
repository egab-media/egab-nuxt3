<script lang="ts">
import { useRules } from '~/composables/rules'

export default defineComponent({
  name: 'EInputWrapper',

  emits: ['update:modelValue'],

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
    },
    rules: {
      type: Array as () => Array<string>,
      default: () => []
    },
    hint: {
      type: String,
      default: undefined
    },
    persistentHint: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit, expose }) {
    const { handleRules } = useRules()


    const textField = resolveComponent('lazy-molecules-e-input-wrapper-partials-e-text-field')
    const textArea = resolveComponent('lazy-molecules-e-input-wrapper-partials-e-textarea')
    const select = resolveComponent('lazy-molecules-e-input-wrapper-partials-e-select')

    const getComponent = computed(() => {
      if (['text', 'password', 'email'].includes(props.type)) {
        return textField
      } else if (props.type === 'textarea') {
        return textArea
      } else if (props.type === 'select') {
        return select
      }
    })

    const reactiveModelValue = computed({
      get() { return props.modelValue },
      set(newValue) { emit('update:modelValue', newValue) }
    })
    // NOTE: It is important to expose the modelValue props to the grandparent
    expose({ modelValue: props.modelValue, rules: props.rules })
    return { getComponent, reactiveModelValue, handleRules }
  }
})
</script>

<template>
  <v-col :cols="cols">
    <component
      :is="getComponent"
      :id="id"
      v-bind="$props"
      v-model="reactiveModelValue"
      :rules="handleRules(rules)"
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
    </component>
  </v-col>
</template>

<style scoped>

</style>
