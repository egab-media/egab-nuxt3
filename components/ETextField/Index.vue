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
      :rules="handleRules(rules)"
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
export default defineComponent({
  name: "ETextField",
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
  data: () => ({
    inputRef: null,
    showPass: false,
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
  }
})
</script>

<script lang="ts" setup>
import {VCol} from "vuetify/components/VGrid"
import {VTextField} from 'vuetify/components/VTextField';
import {VProgressLinear} from "vuetify/components/VProgressLinear";
import { mdiEye, mdiEyeOff } from '@mdi/js'
import {useGetProgress} from '@/composables/input-progress'
import {useRules} from "~/composables/rules";

const { getProgress } = useGetProgress()
let progress = ref(0)
const initProgress = async (inputRef: any, rules: string[]) => getProgress(inputRef, rules, progress)

const {handleRules} = useRules()
// exposing all for unit tests
defineExpose({ progress: progress.value, getProgress, handleRules })
</script>

<style scoped>

</style>
