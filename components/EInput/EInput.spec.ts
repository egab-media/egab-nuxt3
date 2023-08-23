import { VueWrapper } from '@vue/test-utils'
import EInput from './Index.vue'
import { it, expect, describe, afterEach, beforeEach, vi } from 'vitest'
import {
    addI18n,
    addVuetify,
    bootstrapVueContext,
    compositeConfiguration,
    mountWrapper
} from '~/test-utils'

let wrapper: VueWrapper<typeof EInput>
let vueContext: any

const findAsterisk = () => wrapper.find('[data-test="input-asterisk"]')
const findLabelWrapper = () => wrapper.find('.v-label')
const findLabel = () => wrapper.find('[data-test="input-label"]')

describe('Global EInput', () => {
    vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addI18n))
    vueContext.mocks = {
        $worker: {}
    }
    vueContext.propsData = {
        id: 'vi'
    }
    vueContext.stubs = ['v-progress-linear']
    beforeEach(() => {
        /**
         * SECTION: only for vue-phone-input plugin
         * mockIntersectionObserver is used to support polyfill
         */
        // const mockIntersectionObserver = vi.fn()
        // mockIntersectionObserver.mockReturnValue({
        //     observe: () => null,
        //     unobserve: () => null,
        //     disconnect: () => null
        // })
        // window.IntersectionObserver = mockIntersectionObserver

        wrapper = mountWrapper(EInput, vueContext)
    })

    afterEach(() => {
        vueContext.teardownVueContext()
    })

    describe('rendering component', () => {
        it('should load the component', async () => {
            expect(wrapper.vm).toBeTruthy()
        })
    })

    describe('Label', () => {
        it('should render asterisk', async () => {
            expect(findAsterisk().exists()).toBe(false)
            await wrapper.setProps({
                rules: ['required']
            })
            // Must research asterisk again in the new DOM
            expect(findAsterisk().exists()).toBe(true)
            expect(findAsterisk().text()).toEqual('*')
            expect(findAsterisk().attributes('class')).toEqual('red--text')
        })

        it.todo('should render label', async () => {
            const labelWrapper = findLabelWrapper()
            expect(labelWrapper.text()).toBe('vi')

            const labelText = findLabel()

            expect(labelText.exists()).toBeTruthy()
            expect(labelText.text()).toEqual('vi')
            expect(labelText.attributes('class')).toContain('text-caption text-capitalize font-weight-bold')

            await wrapper.setProps({
                rules: ['required']
            })
            expect(labelWrapper.text().replace(/\s+/, '')).toBe('*vi')
        })
    })

    // adds 20% branching cover
    describe('password', () => {
        it('should render pass', async function () {
            const input = wrapper.find('input')
            expect(input.attributes('type')).toEqual('text')
            await wrapper.setProps({ type: 'password' })
            expect(input.attributes('type')).toEqual('password')
        });

        it.todo('should render icons', async function () {
            let iconWrapper;
            iconWrapper = wrapper.find('.v-field__append-inner')
            expect(iconWrapper.exists()).toBeFalsy()

            await wrapper.setProps({ type: 'password' })
            // @ts-ignore
            expect(wrapper.vm.$props.appendIcon).toEqual('')
            iconWrapper = wrapper.find('.v-field__append-inner')
            expect(iconWrapper.exists()).toBeTruthy()
        });
    })

    describe('Rules', () => {
        // covers 2%
        it('should check rules', async function () {
            await wrapper.setProps({ rules: ['required'] })
            expect(wrapper.find('.v-input--error').exists()).toBeFalsy()
            const input = wrapper.find('input')
            await input.trigger('focus')
            await input.trigger('blur')
            expect(wrapper.find('.v-input--error').exists()).toBeTruthy()
            expect(wrapper.find('.v-input__details').text()).toEqual('* required')
        });
    })
})
