import {flushPromises, VueWrapper} from '@vue/test-utils'
import EInput from './Index.vue'
import { it, expect, describe, afterEach, beforeEach, vi } from 'vitest'
import {
    addI18n,
    addVuetify,
    bootstrapVueContext,
    compositeConfiguration,
    mountWrapper
} from '~/test-utils'
import {ComponentPublicInstance} from "@vue/runtime-core";
import * as ruleSpecs from "~/utils/allRules";

type MyComponentProps = any
type MyComponentVariables = {  }
let wrapper: VueWrapper<ComponentPublicInstance<any, any>>
let vueContext: any

const findAsterisk = () => wrapper.find('[data-test="input-asterisk"]')
const findLabelWrapper = () => wrapper.find('.v-label')
const findLabel = () => wrapper.find('[data-test="input-label"]')

describe('Global EInput', () => {
    vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addI18n))
    vueContext.mocks = {$worker: {}}
    vueContext.propsData = {id: 'vi'}
    // vueContext.stubs = ['v-progress-linear']
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
            await wrapper.setProps({ type: 'password', label: 'password' })
            expect(input.attributes('type')).toEqual('password')
            await wrapper.setData({
                showPass: true
            })
            expect(wrapper.find('input').attributes('type')).toEqual('text')
            expect(wrapper.find('label').text()).toBe('password')
        });

        it('should render icons', async function () {
            let iconWrapper;
            iconWrapper = wrapper.find('.v-field__append-inner')
            expect(iconWrapper.exists()).toBeFalsy()

            await wrapper.setProps({ type: 'password' })
            expect(wrapper.vm.appendIcon).toEqual('')
            iconWrapper = wrapper.find('.v-field__append-inner')
            expect(iconWrapper.exists()).toBeTruthy()
            await iconWrapper.find('i').trigger('click')
            expect(wrapper.vm.showPass).toBe(true)
            await iconWrapper.find('i').trigger('click')
            expect(wrapper.vm.showPass).toBe(false)
        });
    })

    describe('Rules', () => {
        // covers 2%
        it('should check required', async function () {
            await wrapper.setProps({ rules: ['required'] })
            expect(wrapper.find('.v-input--error').exists()).toBeFalsy()
            const input = wrapper.find('input')
            await input.trigger('focus')
            await input.trigger('blur')
            expect(wrapper.find('.v-input--error').exists()).toBeTruthy()
            expect(wrapper.find('.v-input__details').text()).toEqual('* required')
        });

        it('should check blank', async function () {
            await wrapper.setProps({ rules: ['blank'] })
            const input = wrapper.find('input')
            await input.trigger('focus')
            await input.trigger('blur')
            expect(wrapper.find('.v-input__details').text()).toEqual('cannot be blank')
        });

        it('should check email', async function () {
            await wrapper.setProps({ rules: ['email'] })
            const input = wrapper.find('input')
            await input.trigger('focus')
            await input.trigger('blur')
            expect(wrapper.find('.v-input__details').text()).toEqual('* Invalid e-mail.')
        });

        it('should check alpha', async function () {
            await wrapper.setProps({ rules: ['alpha'] })
            const input = wrapper.find('input')
            await input.trigger('focus')
            await input.trigger('blur')
            expect(wrapper.find('.v-input__details').text()).toEqual('Only letters are allowed')
        });

        it('should check titleMinChars', async function () {
            await wrapper.setProps({ rules: ['titleMinChars'] })
            const input = wrapper.find('input')
            await input.trigger('focus')
            await input.trigger('blur')
            expect(wrapper.find('.v-input__details').text()).toEqual('* title must have at least 5 words')
        });

        it('should check fullNameMinChars', async function () {
            await wrapper.setProps({ rules: ['fullNameMinChars'] })
            const input = wrapper.find('input')
            await input.trigger('focus')
            await input.trigger('blur')
            expect(wrapper.find('.v-input__details').text()).toEqual('* First and Last name required')
        });

        it('should check hasLowercase', async function () {
            await wrapper.setProps({ rules: ['hasLowercase'] })
            const input = wrapper.find('input')
            await input.trigger('focus')
            await input.trigger('blur')
            expect(wrapper.find('.v-input__details').text()).toEqual('* password must have at least 1 lowercase character')
        });

        it('should check hasUppercase', async function () {
            await wrapper.setProps({ rules: ['hasUppercase'] })
            const input = wrapper.find('input')
            await input.trigger('focus')
            await input.trigger('blur')
            expect(wrapper.find('.v-input__details').text()).toEqual('* password must have at least 1 uppercase character')
        });

        it('should check hasNumber', async function () {
            await wrapper.setProps({ rules: ['hasNumber'] })
            const input = wrapper.find('input')
            await input.trigger('focus')
            await input.trigger('blur')
            expect(wrapper.find('.v-input__details').text()).toEqual('* password must have at least one number')
        });

        it('should check hasSpecial', async function () {
            await wrapper.setProps({ rules: ['hasSpecial'] })
            const input = wrapper.find('input')
            await input.trigger('focus')
            await input.trigger('blur')
            expect(wrapper.find('.v-input__details').text()).toEqual('* password must have at least one special character (\'"!@#$*;&:?-+)')
        });

        it('should check minchars', async function () {
            await wrapper.setProps({ rules: ['minchars'] })
            const input = wrapper.find('input')
            await input.trigger('focus')
            await input.trigger('blur')
            expect(wrapper.find('.v-input__details').text()).toEqual('* password must have at least 6 characters')
        });

        it('should check url', async function () {
            await wrapper.setProps({ rules: ['url'] })
            const input = wrapper.find('input')
            await input.trigger('focus')
            await input.trigger('blur')
            expect(wrapper.find('.v-input__details').text()).toEqual('* Wrong facebook url format')
        });

        it.todo('should check computed rules', async function () {
            await wrapper.setProps({ rules: ['required'] })
            console.log(wrapper.vm.handleRules())
            expect(typeof wrapper.vm.rules[0]).toBe('string')
            expect(wrapper.vm.handleRules()[0]).toContain(function required(val: string) {})
        });
    })

    describe('keyup event', () => {
        it('should test keyup', async function () {
            const spy = vi.spyOn(wrapper.vm, 'initProgress')
            const input = wrapper.find('input')
            await input.trigger('keyup')
            expect(spy).not.toHaveBeenCalled()

            await wrapper.setProps({ type: 'password', rules: ['required', 'alpha'] })
            await input.setValue('ee')
            await input.trigger('keyup')
            expect(spy).toHaveBeenCalled()
        });
    })

    describe('progress bar', () => {
        // Eliminates 14% of branching
        it('should render the progress correctly', async function () {
            await wrapper.setProps({ type: 'password', rules: ['required', 'hasSpecial'] })
            wrapper.vm.progress = 100
            await nextTick()

            const progressBar = wrapper.find('.v-progress-linear')
            const innerBar = progressBar.find('.v-progress-linear__determinate')
            expect(progressBar.attributes('aria-valuenow')).toEqual('100')
            expect(innerBar.attributes('class')).toContain('bg-primary')

            wrapper.vm.progress = 50
            await nextTick()
            expect(progressBar.attributes('aria-valuenow')).toEqual('50')
            expect(innerBar.attributes('class')).toContain('bg-orange')

            wrapper.vm.progress = 80
            await nextTick()
            expect(progressBar.attributes('aria-valuenow')).toEqual('80')
            expect(innerBar.attributes('class')).toContain('bg-warning')
        });
    })
})
