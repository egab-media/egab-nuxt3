<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useGetProgress } from '~/composables/input-progress'
import { useRules } from '~/composables/rules'
const { getProgress } = useGetProgress()

const { t } = useI18n()
const progress = ref(0)
const { handleRules } = useRules()

const initProgress = async (inputRef: any, rules: string[]) => await getProgress(inputRef, rules, progress)

const props = defineProps({
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
})

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

const emit = defineEmits(['update:modelValue'])

const reactiveModelValue = computed({
  get() { return props.modelValue },
  set(newValue) { emit('update:modelValue', newValue) }
})

const inputRef = ref()
onMounted(() => {
  console.log(inputRef.value)
})
// NOTE: It is important to expose the modelValue props to the grand parent
defineExpose({ modelValue: props.modelValue, rules: props.rules })
</script>

<script lang="ts">
export default defineComponent({
  name: 'EInputWrapper'
})
</script>

<template>
  <v-col :cols="cols">
    <component
      :is="getComponent"
      :id="id"
      v-bind="$props"
      :ref="id"
      v-model="reactiveModelValue"
      :rules="handleRules(rules)"
      @keyup="type === 'password' ? initProgress(inputRef, rules) : false"
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

      <template
        v-if="type === 'password'"
        #loader
      >
        <v-progress-linear
          v-for="(_rule, index) in rules"
          :key="index"
          :model-value="progress"
          :color="progress === 100 ? 'primary' : progress < 50 ? 'error' : progress < 70 ? 'orange' : 'warning'"
          :absolute="true"
          height="5"
          style="margin-top: 5px;"
        />
      </template>
    </component>
  </v-col>
</template>

<style scoped>

</style>
