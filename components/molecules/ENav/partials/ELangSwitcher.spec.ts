import {VueWrapper} from "@vue/test-utils";
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import ELangSwitcher from './ELangSwitcher.vue'
import {
    addVuetify,
    bootstrapVueContext,
    compositeConfiguration,
    addI18n,
    addPinia,
    mountWrapper,
} from "~/test-utils";
import {langs} from "~/utils/languages";

let wrapper: VueWrapper<typeof ELangSwitcher>;
let vueContext: any;

describe('ELangSwitcher', () => {
    beforeEach(async () => {
        vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addI18n, addPinia))
        wrapper = mountWrapper(ELangSwitcher, vueContext)
    })
    afterEach(() => {
        vueContext.teardownVueContext()
    })

    it('should mount', async () => {
        expect(wrapper.vm).toBeTruthy()
        await wrapper.setData({
            localeSelection: langs[0]
        })
        const selection = wrapper.find('.v-select__selection').find('.v-list-item-title')
        expect(selection.text()).toEqual('English')
        expect(wrapper.vm.localeSelection).toEqual(langs[0])
        expect(wrapper.vm.font).toEqual('Panton')

        await wrapper.setData({
            localeSelection: langs[1]
        })
        const selection2 = wrapper.find('.v-select__selection').find('.v-list-item-title')
        expect(selection2.text()).toEqual('العربية')
        expect(wrapper.vm.localeSelection).toEqual(langs[1])

        const input = wrapper.find('.v-select')
        await input.trigger('click')
        await nextTick()
        expect(wrapper.html()).toMatchSnapshot()
    })
})
