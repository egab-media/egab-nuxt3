<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import * as ruleSpecs from '~/utils/allRules'
import { useGetProgress } from '~/composables/input-progress'
import { useRules } from '~/composables/rules'
import { ComputedRef } from 'vue'
const { getProgress } = useGetProgress()

const { t } = useI18n()
const reservedRules = {
  required: (val: string) => ruleSpecs.required(val, t('auth.form.validation.required') as string),
  blank: (val: string) => ruleSpecs.blank(val, 'cannot be blank') as string,
  email: (val: string) => ruleSpecs.email(val, t('auth.form.validation.email') as string),
  alpha: (val: string) => ruleSpecs.alpha(val, t('auth.form.validation.alpha') as string),
  titleMinChars: (val: string) => ruleSpecs.titleMinChars(val, t('auth.form.validation.titleMinChars') as string),
  fullNameMinChars: (val: string) => ruleSpecs.fullNameMinChars(val, t('auth.form.validation.fullNameMinChars') as string),
  hasLowercase: (val: string) => ruleSpecs.hasLowercase(val, t('auth.form.validation.hasLowercase') as string),
  hasUppercase: (val: string) => ruleSpecs.hasUppercase(val, t('auth.form.validation.hasUppercase') as string),
  hasNumber: (val: string) => ruleSpecs.hasNumber(val, t('auth.form.validation.hasNumber') as string),
  hasSpecial: (val: string) => ruleSpecs.hasSpecial(val, t('auth.form.validation.hasSpecial') as string),
  minchars: (val: string) => ruleSpecs.minchars(val, t('auth.form.validation.minchars') as string),
  url: (val: string) => ruleSpecs.url(val)
} as any

// const handleRules = (rules: Array<string>) => {
//   const finalRules: any = []
//
//   rules.forEach((key: string | any) => {
//     if (typeof key !== 'string') {
//       finalRules.push(key)
//     }
//
//     if (key in reservedRules) {
//       finalRules.push(reservedRules[key])
//     }
//   })
//   return finalRules
// }

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
