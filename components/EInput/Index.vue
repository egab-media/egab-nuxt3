<template>
  <v-col :cols="cols">
    <v-text-field
      v-model="reactiveValue"
      v-bind="$props"
      :ref="id"
      :append-inner-icon="type === 'password' ? showPass ? mdiEye : mdiEyeOff : appendIcon"
      density="compact"
      :type="showPass ? 'text' : type"
      flat
      dirty
      variant="outlined"
      :rules="handleRules()"
      @keyup="getProgress()"
      @click:appendInner="showPass = !showPass"
    >
      <template
          v-for="(_, inputSlot) in $slots"
          #[inputSlot]="slotScope"
      >
        <!-- @slot inputSlot to enable using custom templates -->
        <slot :name="inputSlot" v-bind="slotScope" />
      </template>

      <template #label>
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
  },
  data: () => ({
    inputRef: null,
    showPass: false,
    progress: 0
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
      const reservedRules: any = {
        required: (val: string) => ruleSpecs.required(val, this.$t('auth.form.validation.required') as string),
        blank: (val: string) => ruleSpecs.blank(val, 'cannot be blank') as string,
        email: (val: string) => ruleSpecs.email(val, this.$t('auth.form.validation.email') as string),
        alpha: (val: string) => ruleSpecs.alpha(val, this.$t('auth.form.validation.alpha') as string),
        titleMinChars: (val: string) => ruleSpecs.titleMinChars(val, this.$t('auth.form.validation.titleMinChars') as string),
        fullNameMinChars: (val: string) => ruleSpecs.fullNameMinChars(val, this.$t('auth.form.validation.fullNameMinChars') as string),
        ip: (val: string) => ruleSpecs.ip(val, this.$t('auth.form.validation.ip') as string),
        port: (val: string) => ruleSpecs.port(val, this.$t('auth.form.validation.port') as string),
        hasLowercase: (val: string) => ruleSpecs.hasLowercase(val, this.$t('auth.form.validation.hasLowercase') as string),
        hasUppercase: (val: string) => ruleSpecs.hasUppercase(val, this.$t('auth.form.validation.hasUppercase') as string),
        hasNumber: (val: string) => ruleSpecs.hasNumber(val, this.$t('auth.form.validation.hasNumber') as string),
        hasSpecial: (val: string) => ruleSpecs.hasSpecial(val, this.$t('auth.form.validation.hasSpecial') as string),
        minchars: (val: string) => ruleSpecs.minchars(val, this.$t('auth.form.validation.minchars') as string),
        url: (val: string) => ruleSpecs.url(val)
      }
      this.rules.forEach((key: string | any) => {
        if (typeof key !== 'string') {
          finalRules.push(key)
          console.log('rules => ', finalRules)
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
    async getProgress() {
      if (process.client) {
        let errs: any[] = []
        if (this.inputRef) {
          const cached = await (this.inputRef as any).validate()
          errs = toRaw(cached)
          console.log(errs)
        }

        const worker = new Worker('/js/password-progress.worker.js')
        // Listening
        worker.addEventListener('message', (event: { data: number }) => {
          this.progress = event.data
          console.log('received from worker => ', event.data)
          worker.terminate()
        })

        // initiating
        worker.postMessage({
          rules: this.rules,
          errs
        })
        console.log(this.progress)
        return this.progress
      }
    }
  }
})
</script>

<script lang="ts" setup>
import {VCol} from "vuetify/components/VGrid"
import {VTextField} from 'vuetify/components/VTextField';
import {VProgressLinear} from "vuetify/components/VProgressLinear";
import { mdiEye, mdiEyeOff } from '@mdi/js'
</script>

<style scoped>

</style>
