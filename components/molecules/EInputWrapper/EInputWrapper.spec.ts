import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import { VueWrapper } from '@vue/test-utils'
import EInputWrapper from './Index.vue'
import { addVuetify, bootstrapVueContext, compositeConfiguration, mountWrapper } from '~/test-utils'

let wrapper: VueWrapper<typeof EInputWrapper>
let vueContext: any

describe('EInputWrapper', function () {
  beforeEach(() => {
    vueContext = bootstrapVueContext(compositeConfiguration(addVuetify))
    wrapper = mountWrapper(EInputWrapper, vueContext)
  })
  afterEach(() => { vueContext.teardownVueContext() })

  it('should render text field by default', function () {
    expect(wrapper.find('lazy-molecules-e-input-wrapper-partials-e-text-field').exists()).toBeTruthy()
  })

  it.todo('should load textarea', function () {})
  it.todo('should load select', function () {})
  it.todo('should load combobox', function () {})
  it.todo('should load phone', function () {})
  it.todo('should load rich text editor', function () {})
})
