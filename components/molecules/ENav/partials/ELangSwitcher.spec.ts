import {VueWrapper} from "@vue/test-utils";
import { beforeEach, afterEach, describe, it, expect } from 'vitest'
import ELangSwitcher from './ELangSwitcher.vue'
import {
    addVuetify,
    bootstrapVueContext,
    compositeConfiguration,
    addI18n,
    addPinia,
    mountWrapper
} from "~/test-utils";

let wrapper: VueWrapper<any>;
let vueContext: any;

describe('ELangSwitcher', () => {
    beforeEach(() => {
        vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addI18n, addPinia))
        wrapper = mountWrapper(ELangSwitcher, vueContext)
    })
    afterEach(() => {
        vueContext.teardownVueContext()
    })

    it('should mount', () => {
        expect(wrapper.vm).toBeTruthy()
        const selection = wrapper.find('.v-select__selection').find('.v-list-item-title')
        expect(selection.text()).toEqual('English')
    })
})
