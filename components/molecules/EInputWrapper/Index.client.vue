<script lang="ts" setup>
import { useRules } from '~/composables/rules'
const { handleRules } = useRules()
</script>

<script lang="ts">
export default defineComponent({
  name: 'EInputWrapper',

  props: {
    /** @property {String} id => Input ID */
    id: {
      type: String,
      required: true
    },
    /** @property {String} type => Input type */
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
    items: {
      type: Array,
      default: undefined
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

  emits: ['update:modelValue'],

  setup(props, { emit, expose }) {
    /**
     * Cached components for dynamic rendering
     * NOTE: It is important to expose the components to the grandparent so that they can be used in the parent component
     */
    // const textField = resolveComponent('molecules-e-input-wrapper-partials-e-text-field')
    // const textArea = resolveComponent('molecules-e-input-wrapper-partials-e-textarea')
    // const select = resolveComponent('molecules-e-input-wrapper-partials-e-select')

    // NOTE: It is important to expose the modelValue props to the grandparent
    expose({ modelValue: props.modelValue, rules: props.rules })
  },

  computed: {
    /**
     * @method getComponent => Dynamically render the correct component based on the type prop
     * @description Computed property to determine which component to render
     * @returns {Component}
     */
    getComponent() {
      if (['text', 'password', 'email'].includes(this.type)) {
        return resolveComponent('molecules-e-input-wrapper-partials-e-text-field')
      } else if (this.type === 'textarea') {
        return resolveComponent('molecules-e-input-wrapper-partials-e-textarea')
      } else if (this.type === 'select') {
        return resolveComponent('molecules-e-input-wrapper-partials-e-select')
      } else {
        return resolveComponent('molecules-e-input-wrapper-partials-e-text-field')
      }
    },
    /**
     * @method reactiveModelValue => Reactively update the modelValue prop
     * @description Computed property to determine which component to render
     * @returns {Component}
     */
    reactiveModelValue: {
      get() { return this.modelValue },
      set(newValue: any) { this.$emit('update:modelValue', newValue) }
    }
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
