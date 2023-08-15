import { VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import ESelect from './Index.vue'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {addVuetify, bootstrapVueContext, compositeConfiguration, mountWrapper} from '~/test-utils'
// import { required } from '@/components/EInput/allRules'

let wrapper: VueWrapper<typeof ESelect>
let vueContext: any

const findLabelWrapper = () => wrapper.find('[data-test="select-label"]')
const findAsterisk = () => wrapper.find('[data-test="select-asterisk"]')
const findSelectLabel = () => wrapper.find('[data-test="label-text"]')
const findSelectInput = () => wrapper.find('input')

describe('Eselect', () => {
    vueContext = bootstrapVueContext(compositeConfiguration(addVuetify))
    beforeEach(() => {
        vueContext.propsData = {
            items: [{title: 'number', value: 0}]
        }
        vueContext.slots = {
            default: 'hello from jest',
            item: 'item'
        }

        wrapper = mountWrapper(ESelect, vueContext)
    })

    afterEach(() => {
        vueContext.teardownVueContext()
    })

    describe('mount', () => {
        it('should mount', function () {
            expect(wrapper.vm).toBeTruthy()
        })
    })

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
            expect(labelWrapper.text()).toEqual('*jest label')
        })

        it('should display the correct label font', async () => {
            await wrapper.setProps({
                label: 'jest label'
            })
            const label = findSelectLabel()
            console.log(label.attributes('class'))
            expect(label.attributes('class')).toContain('text-capitalize text-caption font-weight-bold')
        })
    })

    describe('select input', function () {
        it('should render select input', function () {
            expect(findSelectInput().exists()).toBeTruthy()
        })

    //     it('should pass chips prop', async () => {
    //         expect(findSelectInput().props('chips')).toEqual(false)
    //         await wrapper.setProps({
    //             chips: true
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('chips')).toEqual(true)
    //     })
    //
    //     it('should pass multiple prop', async () => {
    //         expect(findSelectInput().props('multiple')).toEqual(false)
    //         await wrapper.setProps({
    //             multiple: true
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('multiple')).toEqual(true)
    //     })
    //
    //     it('should pass flat prop', async () => {
    //         expect(findSelectInput().props('flat')).toEqual(false)
    //         await wrapper.setProps({
    //             flat: true
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('flat')).toEqual(true)
    //     })
    //
    //     it('should pass dense prop', async () => {
    //         expect(findSelectInput().props('dense')).toEqual(false)
    //         await wrapper.setProps({
    //             dense: true
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('dense')).toEqual(true)
    //     })
    //
    //     it('should pass solo prop', async () => {
    //         expect(findSelectInput().props('solo')).toEqual(false)
    //         await wrapper.setProps({
    //             solo: true
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('solo')).toEqual(true)
    //     })
    //
    //     it('should pass filled prop', async () => {
    //         expect(findSelectInput().props('filled')).toEqual(false)
    //         await wrapper.setProps({
    //             filled: true
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('filled')).toEqual(true)
    //     })
    //
    //     it('should pass disabled prop', async () => {
    //         expect(findSelectInput().props('disabled')).toEqual(false)
    //         await wrapper.setProps({
    //             disabled: true
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('disabled')).toEqual(true)
    //     })
    //
    //     it('should pass deletableChips prop', async () => {
    //         expect(findSelectInput().props('deletableChips')).toEqual(false)
    //         await wrapper.setProps({
    //             deletableChips: true
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('deletableChips')).toEqual(true)
    //     })
    //
    //     it('should pass smallChips prop', async () => {
    //         expect(findSelectInput().props('smallChips')).toEqual(false)
    //         await wrapper.setProps({
    //             smallChips: true
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('smallChips')).toEqual(true)
    //     })
    //
    //     it('should pass rules prop', async () => {
    //         expect(findSelectInput().props('rules')).toEqual([])
    //         await wrapper.setProps({
    //             rules: ['required']
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('rules')).toEqual([required])
    //     })
    //
    //     it('should pass value prop', async () => {
    //         expect(findSelectInput().props('value')).toEqual(null)
    //         await wrapper.setProps({
    //             value: 'string value'
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('value')).toEqual('string value')
    //
    //         await wrapper.setProps({
    //             value: ['string value']
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('value')).toEqual(['string value'])
    //
    //         await wrapper.setProps({
    //             value: { id: 'string value' }
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('value')).toEqual({ id: 'string value' })
    //     })
    //
    //     it('should pass menuProps prop', async () => {
    //         expect(findSelectInput().props('menuProps')).toEqual({
    //             closeOnClick: false,
    //             closeOnContentClick: false,
    //             disableKeys: true,
    //             maxHeight: 304,
    //             openOnClick: false
    //         })
    //         await wrapper.setProps({
    //             menuProps: { color: 'primary' }
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('menuProps')).toEqual({ color: 'primary' })
    //     })
    //
    //     it('should pass placeholder prop', async () => {
    //         expect(findSelectInput().props('placeholder')).toEqual(null)
    //         await wrapper.setProps({
    //             placeholder: 'jest placeholder'
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('placeholder')).toEqual('jest placeholder')
    //     })
    //
    //     it('should pass outlined prop', async () => {
    //         expect(findSelectInput().props('outlined')).toEqual(false)
    //         await wrapper.setProps({
    //             outlined: true
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('outlined')).toEqual(true)
    //     })
    //
    //     it('should pass hideDetails prop', async () => {
    //         expect(findSelectInput().props('hideDetails')).toEqual(false)
    //         await wrapper.setProps({
    //             hideDetails: true
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('hideDetails')).toEqual(true)
    //     })
    //
    //     it('should pass loading prop', async () => {
    //         expect(findSelectInput().props('loading')).toEqual(false)
    //         await wrapper.setProps({
    //             loading: true
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('loading')).toEqual(true)
    //     })
    //
    //     it('should pass itemValue prop', async () => {
    //         expect(findSelectInput().props('itemValue')).toEqual(null)
    //         await wrapper.setProps({
    //             itemValue: 'id'
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('itemValue')).toEqual('id')
    //     })
    //
    //     it('should pass itemText prop', async () => {
    //         expect(findSelectInput().props('itemText')).toEqual(null)
    //         await wrapper.setProps({
    //             itemText: 'text'
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('itemText')).toEqual('text')
    //     })
    //
    //     it('should pass prependInnerIcon prop', async () => {
    //         expect(findSelectInput().props('prependInnerIcon')).toEqual('')
    //         await wrapper.setProps({
    //             prependInnerIcon: 'some-icon'
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('prependInnerIcon')).toEqual('some-icon')
    //     })
    //
    //     it('should pass returnObject prop', async () => {
    //         expect(findSelectInput().props('returnObject')).toEqual(false)
    //         await wrapper.setProps({
    //             returnObject: true
    //         })
    //         await nextTick()
    //         expect(findSelectInput().props('returnObject')).toEqual(true)
    //     })
    //
    //     it('should emit at input', async () => {
    //         // wrapper.setProps({ value: { id: 1, text: 'something' } })
    //         await findSelectInput().trigger('input')
    //         await nextTick()
    //         expect(wrapper.emitted()).toHaveProperty('input')
    //     })
    })
})
