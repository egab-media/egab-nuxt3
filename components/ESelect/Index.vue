<template>
  <v-col :cols="cols">
    <v-label
      :for="id"
      data-test="select-label"
    >
      <span v-if="rules.includes('required')" data-test="select-asterisk" class="red--text">*</span>
      <span data-test="label-text" class="text-capitalize text-caption font-weight-bold">
        {{ label }}
      </span>
    </v-label>

    <br>

    <v-select
      :id="id"
      :items="items"
      :chips="chips"
      :multiple="multiple"
      :flat="flat"
      :dense="dense"
      :solo="solo"
      :filled="filled"
      :disabled="disabled"
      :deletable-chips="deletableChips"
      :small-chips="smallChips"
      :model-value="value"
      :menu-props="menuProps"
      :placeholder="placeholder"
      :outlined="outlined"
      :hide-details="hideDetails"
      :loading="loading"
      :item-value="itemValue"
      :item-text="itemText"
      :item-color="itemColor"
      :prepend-inner-icon="prependInnerIcon"
      :return-object="returnObject"
      :clearable="clearable"
      class="text-body-2"
    >
      <template
          v-for="inputSlot in Object.keys(slots)"
          #[inputSlot]="slotScope"
      >
        <!-- @slot inputSlot to enable using custom templates -->
        <slot :name="inputSlot" v-bind="slotScope" />
      </template>
    </v-select>
  </v-col>
</template>

<script lang="ts">
// import * as ruleSpecs from '../EInput/allRules'

export default defineComponent({
  name: 'ESelect',

  emits: ['update:modelValue'],

  props: {
    cols: {
      type: [String, Number],
      default: undefined
    },
    id: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      default: () => []
    },
    dense: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: false
    },
    chips: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    deletableChips: {
      type: Boolean,
      default: false
    },
    smallChips: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    solo: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    menuProps: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    value: {
      type: [String, Array, Object, Number, Boolean],
      default: null
    },
    hint: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    clearable: { type: Boolean, default: false },
    placeholder: {
      type: String,
      default: null
    },
    itemValue: {
      type: [String, Number, Object],
      default: null
    },
    itemText: {
      type: String,
      default: null
    },
    itemColor: {
      type: String,
      default: 'primary'
    },
    prependInnerIcon: {
      type: String,
      default: ''
    }
  },

  data: () => ({}),

  computed: {
    // reactiveValue: {
    //   get() { return this.value },
    //   set(newValue: any) { this.$emit('update:modelValue', newValue) }
    // }
    // handleRules () {
    //   const finalRules: any = []
    //   const reservedRules = {
    //     ...ruleSpecs
    //   } as any
    //   (this as any).rules.forEach((key: string) => {
    //     if (key in reservedRules) {
    //       finalRules.push(reservedRules[key])
    //     }
    //   })
    //
    //   return finalRules
    // }
  }
})
</script>

<script lang="ts" setup>
import { VSelect } from 'vuetify/components/VSelect'
import { VCol } from 'vuetify/components/VGrid'
import { VLabel } from 'vuetify/components/VLabel'
const slots = useSlots()
</script>

<style scoped>

</style>
