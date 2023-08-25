<template>
  <v-col :cols="cols">
    <v-text-field
      v-model="reactiveValue"
      v-bind="$props"
      :ref="id"
      :id="id"
      :append-inner-icon="type === 'password' ? showPass ? mdiEye : mdiEyeOff : appendIcon"
      density="compact"
      :type="showPass ? 'text' : type"
      flat
      :title="id"
      variant="outlined"
      :rules="handleRules()"
      @keyup="type === 'password' ? initProgress(inputRef, rules) : false"
      @click:appendInner="showPass = !showPass"
    >
      <template
          v-for="(_, inputSlot) in $slots"
          #[inputSlot]="slotScope"
      >
        <slot :name="inputSlot" v-bind="slotScope" />
      </template>

      <template v-slot:label="{label, props}">
        <span v-if="rules.includes('required')" v-text="'* '" data-test="input-asterisk" class="red--text" />
        <span v-text="label" data-test="input-label" />
      </template>

      <template v-if="type === 'password'" #loader>
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
    </v-text-field>
  </v-col>
</template>

<script lang="ts">
import * as ruleSpecs from '~/utils/allRules'

export default defineComponent({
  name: "EInput",
  emits: ['update:modelValue'],
  props: {
    cols: {
      type: [String, Number],
      default: 12
    },
    id: {
      type: String,
      default: 'test'
    },
    label: {
      type: String,
      default: null
    },
    hint: { type: String, default: undefined },
    persistentHint: { type: Boolean, default: false },
    modelValue: {
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
  data: (vm) => ({
    inputRef: null,
    showPass: false,
    // progress: 0,
    reservedRules: {
      required: (val: string) => ruleSpecs.required(val, vm.$t('auth.form.validation.required') as string),
      blank: (val: string) => ruleSpecs.blank(val, 'cannot be blank') as string,
      email: (val: string) => ruleSpecs.email(val, vm.$t('auth.form.validation.email') as string),
      alpha: (val: string) => ruleSpecs.alpha(val, vm.$t('auth.form.validation.alpha') as string),
      titleMinChars: (val: string) => ruleSpecs.titleMinChars(val, vm.$t('auth.form.validation.titleMinChars') as string),
      fullNameMinChars: (val: string) => ruleSpecs.fullNameMinChars(val, vm.$t('auth.form.validation.fullNameMinChars') as string),
      hasLowercase: (val: string) => ruleSpecs.hasLowercase(val, vm.$t('auth.form.validation.hasLowercase') as string),
      hasUppercase: (val: string) => ruleSpecs.hasUppercase(val, vm.$t('auth.form.validation.hasUppercase') as string),
      hasNumber: (val: string) => ruleSpecs.hasNumber(val, vm.$t('auth.form.validation.hasNumber') as string),
      hasSpecial: (val: string) => ruleSpecs.hasSpecial(val, vm.$t('auth.form.validation.hasSpecial') as string),
      minchars: (val: string) => ruleSpecs.minchars(val, vm.$t('auth.form.validation.minchars') as string),
      url: (val: string) => ruleSpecs.url(val)
    } as any
  }),

  computed: {
    reactiveValue: {
      get(): any {
        return this.modelValue
      },
      set(newValue: any) {
        this.$emit('update:modelValue', newValue)
      }
    }
  },

  mounted() {
    // Cache the input ref based on the passed id prop for handling validation and progress
    if (this.$refs && this.$refs[this.id]) {
      (this as any).inputRef = this.$refs[this.id]
    }
  },

  methods: {
    /**
     * @method handleRules
     * This takes the string values of the passed 'rules' prop
     * and executes the reserved rules stored in @/components/EInput/allRules.ts
     * ---
     * This is engineered for 4 reasons:
     * 1. To ensure having singularity for common validation rules all over the software
     * 2. To avoid multiple imports for the same rules in every parent component
     * 3. To isolate the rules as a business logic for unit testing (later)
     * 4. To easily maintain the rules from @/components/EInput/allRules.ts file
     * ---
     * @returns Array<Function>
     */
    handleRules(): Array<any> {
      const finalRules: any = []
      const reservedRules = this.reservedRules

      this.rules.forEach((key: string | any) => {
        if (typeof key !== 'string') {
          finalRules.push(key)
        }

        if (key in reservedRules) {
          finalRules.push(reservedRules[key])
        }
      })
      return finalRules
    },

    /**
     * DO NOT DELETE!
     * @method getProgress
     * Uses a service worker to calculate the progress for passing password requirements
     * This is engineered to ensure that the is no stress on the main browser thread
     * So it is preferable to assign this to another browser thread to avoid performance issues
     * @returns {number} progress
     */
    // async getProgress() {
    //   if (process.client) {
    //     let errs: any[] = []
    //     if (this.inputRef) {
    //       const cached = await (this.inputRef as any).validate()
    //       errs = toRaw(cached)
    //     }
    //
    //     const worker = new Worker('/js/password-progress.worker.js')
    //     // Listening
    //     worker.addEventListener('message', (event: { data: number }) => {
    //       this.progress = event.data
    //       worker.terminate()
    //     })
    //
    //     // initiating
    //     worker.postMessage({
    //       rules: this.rules,
    //       errs
    //     })
    //     return this.progress
    //   }
    // }
  }
})
</script>

<script lang="ts" setup>
import {VCol} from "vuetify/components/VGrid"
import {VTextField} from 'vuetify/components/VTextField';
import {VProgressLinear} from "vuetify/components/VProgressLinear";
import { mdiEye, mdiEyeOff } from '@mdi/js'
import {useGetProgress} from '@/composables/input-progress'

const { getProgress } = useGetProgress()
const progress = ref(0)
const initProgress = (inputRef: any, rules: string[]) => getProgress(inputRef, rules, toRef(progress))
defineExpose({ progress, getProgress })
</script>

<style scoped>

</style>
