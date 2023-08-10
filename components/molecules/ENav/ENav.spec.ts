import { VueWrapper } from '@vue/test-utils';
import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import {addVuetify, bootstrapVueContext, compositeConfiguration, shallowMount} from "@/test-utils";
import { debug } from 'vitest-preview';
import ENav from './Index.vue'

let wrapper: VueWrapper<any>;
let vueContext: any;

describe('ENav', () => {
    vueContext = bootstrapVueContext(compositeConfiguration(addVuetify))
    beforeEach(() => {
        vueContext.stubs = ['client-only']
        // vueContext.attachTo = '#app'
        wrapper = shallowMount(ENav, vueContext)
    })
    afterEach(() => {
        vueContext.teardownVueContext()
    })

    it('should test the component', () => {
        expect(wrapper.vm).toBeTruthy()
        debug()
    })
})
