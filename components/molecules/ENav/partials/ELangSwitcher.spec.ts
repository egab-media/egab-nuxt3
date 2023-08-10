import {VueWrapper} from "@vue/test-utils";
import { beforeEach, afterEach, describe, it, expect } from 'vitest'
import ELangSwitcher from './ELangSwitcher.vue'
import {addVuetify, bootstrapVueContext, compositeConfiguration, shallowMount, addRouter } from "~/test-utils";

let wrapper: VueWrapper<any>;
let vueContext: any;

describe('ELangSwitcher', () => {
    beforeEach(() => {
        vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addRouter))
        wrapper = shallowMount(ELangSwitcher, vueContext)
    })
    afterEach(() => {
        vueContext.teardownVueContext()
    })

    it('should mount', () => {
        expect(wrapper.vm).toBeTruthy()
    })
})
