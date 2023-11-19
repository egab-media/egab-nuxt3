import { VueWrapper } from '@vue/test-utils'
import { it, expect, describe, afterEach, beforeEach, vi } from 'vitest'
import ESelect from './Index.vue'
import { addVuetify, bootstrapVueContext, compositeConfiguration, mountWrapper } from '~/test-utils'

let wrapper: VueWrapper<typeof ESelect>
let vueContext: any

const findLabelWrapper = () => wrapper.find('.v-label')
const findAsterisk = () => wrapper.find('[data-test="select-asterisk"]')
const findSelectLabel = () => wrapper.find('[data-test="select-label"]')
const findSelectInput = () => wrapper.find('.v-select')

describe('ESelect', () => {
  vueContext = bootstrapVueContext(compositeConfiguration(addVuetify))
  vueContext.propsData = {
    modelValue: 'test'
  }
  beforeEach(() => {
    wrapper = mountWrapper(ESelect, vueContext)
  })
  afterEach(() => vueContext.teardownVueContext())

  describe('label', () => {
    it('should render label', async () => {
      await wrapper.setProps({
        label: 'jest label'
      })
      const label = findLabelWrapper()
      expect(label.exists()).toBeTruthy()
      expect(label.text()).toEqual('jest label')
    })

    it('should render asterisk if required', async () => {
      await wrapper.setProps({
        label: 'jest label',
        rules: ['required']
      })
      const labelWrapper = findLabelWrapper()
      const asterisk = findAsterisk()
      expect(asterisk.exists()).toBeTruthy()
      expect(asterisk.text()).toEqual('*')
      expect(labelWrapper.text().replace(/\s+/, '')).toEqual('*jest label')
    })

    it('should display the correct label font', async () => {
      await wrapper.setProps({
        label: 'jest label'
      })
      const label = findSelectLabel()
      expect(label.attributes('class')).toContain('text-capitalize text-caption font-weight-bold')
    })
  })

  describe.todo('select input', function () {
    it('should render select input', async function () {
      expect(findSelectInput().exists()).toBeTruthy()
      await wrapper.setProps({items: []})
      console.log(findSelectInput().attributes())
      expect(findSelectInput().attributes('items')).toEqual([])
    })

    it.todo('should pass chips prop', async () => {
      expect(findSelectInput().attributes('chips')).toEqual(false)
      await wrapper.setProps({
        chips: true
      })
      await nextTick()
      expect(findSelectInput().attributes('chips')).toEqual(true)
    })

    it.todo('should pass multiple prop', async () => {
      expect(findSelectInput().attributes('multiple')).toEqual(false)
      await wrapper.setProps({
        multiple: true
      })
      await nextTick()
      expect(findSelectInput().attributes('multiple')).toEqual(true)
    })

    it.todo('should pass flat prop', async () => {
      expect(findSelectInput().attributes('flat')).toEqual(false)
      await wrapper.setProps({
        flat: true
      })
      await nextTick()
      expect(findSelectInput().attributes('flat')).toEqual(true)
    })

    it.todo('should pass dense prop', async () => {
      expect(findSelectInput().attributes('dense')).toEqual(false)
      await wrapper.setProps({
        dense: true
      })
      await nextTick()
      expect(findSelectInput().attributes('dense')).toEqual(true)
    })

    it.todo('should pass solo prop', async () => {
      expect(findSelectInput().attributes('solo')).toEqual(false)
      await wrapper.setProps({
        solo: true
      })
      await nextTick()
      expect(findSelectInput().attributes('solo')).toEqual(true)
    })

    it.todo('should pass filled prop', async () => {
      expect(findSelectInput().attributes('filled')).toEqual(false)
      await wrapper.setProps({
        filled: true
      })
      await nextTick()
      expect(findSelectInput().attributes('filled')).toEqual(true)
    })

    it.todo('should pass disabled prop', async () => {
      expect(findSelectInput().attributes('disabled')).toEqual(false)
      await wrapper.setProps({
        disabled: true
      })
      await nextTick()
      expect(findSelectInput().attributes('disabled')).toEqual(true)
    })

    it.todo('should pass deletableChips prop', async () => {
      expect(findSelectInput().attributes('deletableChips')).toEqual(false)
      await wrapper.setProps({
        deletableChips: true
      })
      await nextTick()
      expect(findSelectInput().attributes('deletableChips')).toEqual(true)
    })

    it.todo('should pass smallChips prop', async () => {
      expect(findSelectInput().attributes('smallChips')).toEqual(false)
      await wrapper.setProps({
        smallChips: true
      })
      await nextTick()
      expect(findSelectInput().attributes('smallChips')).toEqual(true)
    })

    it.todo('should pass rules prop', async () => {
      expect(findSelectInput().attributes('rules')).toEqual([])
      await wrapper.setProps({
        rules: ['required']
      })
      await nextTick()
      expect(findSelectInput().attributes('rules')).toEqual([required])
    })

    it.todo('should pass value prop', async () => {
      expect(findSelectInput().attributes('value')).toEqual(null)
      await wrapper.setProps({
        value: 'string value'
      })
      await nextTick()
      expect(findSelectInput().attributes('value')).toEqual('string value')

      await wrapper.setProps({
        value: ['string value']
      })
      await nextTick()
      expect(findSelectInput().attributes('value')).toEqual(['string value'])

      await wrapper.setProps({
        value: { id: 'string value' }
      })
      await nextTick()
      expect(findSelectInput().attributes('value')).toEqual({ id: 'string value' })
    })

    it.todo('should pass menuProps prop', async () => {
      expect(findSelectInput().attributes('menuProps')).toEqual({
        closeOnClick: false,
        closeOnContentClick: false,
        disableKeys: true,
        maxHeight: 304,
        openOnClick: false
      })
      await wrapper.setProps({
        menuProps: { color: 'primary' }
      })
      await nextTick()
      expect(findSelectInput().attributes('menuProps')).toEqual({ color: 'primary' })
    })

    it.todo('should pass placeholder prop', async () => {
      expect(findSelectInput().attributes('placeholder')).toEqual(null)
      await wrapper.setProps({
        placeholder: 'jest placeholder'
      })
      await nextTick()
      expect(findSelectInput().attributes('placeholder')).toEqual('jest placeholder')
    })

    it.todo('should pass outlined prop', async () => {
      expect(findSelectInput().attributes('outlined')).toEqual(false)
      await wrapper.setProps({
        outlined: true
      })
      await nextTick()
      expect(findSelectInput().attributes('outlined')).toEqual(true)
    })

    it.todo('should pass hideDetails prop', async () => {
      expect(findSelectInput().attributes('hideDetails')).toEqual(false)
      await wrapper.setProps({
        hideDetails: true
      })
      await nextTick()
      expect(findSelectInput().attributes('hideDetails')).toEqual(true)
    })

    it.todo('should pass loading prop', async () => {
      expect(findSelectInput().attributes('loading')).toEqual(false)
      await wrapper.setProps({
        loading: true
      })
      await nextTick()
      expect(findSelectInput().attributes('loading')).toEqual(true)
    })

    it.todo('should pass itemValue prop', async () => {
      expect(findSelectInput().attributes('itemValue')).toEqual(null)
      await wrapper.setProps({
        itemValue: 'id'
      })
      await nextTick()
      expect(findSelectInput().attributes('itemValue')).toEqual('id')
    })

    it.todo('should pass itemText prop', async () => {
      expect(findSelectInput().attributes('itemText')).toEqual(null)
      await wrapper.setProps({
        itemText: 'text'
      })
      await nextTick()
      expect(findSelectInput().attributes('itemText')).toEqual('text')
    })

    it.todo('should pass prependInnerIcon prop', async () => {
      expect(findSelectInput().attributes('prependInnerIcon')).toEqual('')
      await wrapper.setProps({
        prependInnerIcon: 'some-icon'
      })
      await nextTick()
      expect(findSelectInput().attributes('prependInnerIcon')).toEqual('some-icon')
    })

    it.todo('should pass returnObject prop', async () => {
      expect(findSelectInput().attributes('returnObject')).toEqual(false)
      await wrapper.setProps({
        returnObject: true
      })
      await nextTick()
      expect(findSelectInput().attributes('returnObject')).toEqual(true)
    })

    it.todo('should emit at input', async () => {
      // wrapper.setProps({ value: { id: 1, text: 'something' } })
      await findSelectInput().trigger('input')
      await nextTick()
      expect(wrapper.emitted()).toHaveProperty('input')
    })
  })
})
