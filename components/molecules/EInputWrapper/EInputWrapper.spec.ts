import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { VueWrapper } from '@vue/test-utils'
import EInputWrapper from './Index.client.vue'
import { ETextField, ESelect, ETextarea } from './partials'
import { addI18n, addVuetify, bootstrapVueContext, compositeConfiguration, mountWrapper } from '~/test-utils'

let wrapper: VueWrapper<typeof EInputWrapper>
let vueContext: any

describe('EInputWrapper', function () {
  vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addI18n))
  vueContext.components = {
    'molecules-e-input-wrapper-partials-e-text-field': ETextField,
    'molecules-e-input-wrapper-partials-e-textarea': ETextarea,
    'molecules-e-input-wrapper-partials-e-select': ESelect
  }
  vueContext.propsData = {
    id: 'vi',
    modelValue: 'vitest'
  }

  beforeEach(() => {
    wrapper = mountWrapper(EInputWrapper, vueContext)
  })
  afterEach(() => { vueContext.teardownVueContext() })

  it('should render text field by default', function () {
    expect(wrapper.find('.v-text-field').exists()).toBeTruthy()
  })

  it('should load textarea', async function () {
    await wrapper.setProps({
      type: 'textarea'
    })
    expect(wrapper.find('.v-textarea').exists()).toBeTruthy()
  })
  it('should load select', async function () {
    await wrapper.setProps({
      type: 'select'
    })
    expect(wrapper.find('.v-select').exists()).toBeTruthy()
  })

  it.todo('should load combobox', function () {})
  it.todo('should load phone', function () {})
  it.todo('should load rich text editor', function () {})
})
