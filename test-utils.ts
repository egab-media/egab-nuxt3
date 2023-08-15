import { vi } from 'vitest'
import en from '@/locales/en-US.json'
import ar from '@/locales/ar-SA.json'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import * as vueTestUtils from '@vue/test-utils'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

export const addVuetify = (context: any) => {
    context.vuetifyInstance = createVuetify({});
    context.vueTestUtils.config.global.plugins = [context.vuetifyInstance];
    context.vueTestUtils.config.global.CSS = { supports: () => false };
}

// export const addVuex = (context: { vuex: any; vue: { use: (arg0: any) => void } }) => {
//     context.vuex = require('vuex')
//     context.vue.use(context.vuex)
// }

export const addPinia = (context: any) => {
    context.vueTestUtils.config.global.plugins.push(createTestingPinia())
}

export const addI18n = (context: any): any => {
    // eslint-disable-next-line new-cap
    context.i18nInstance = createI18n({
        // ...options,
        messages: { en, ar },
        fallbackLocale: 'en',
        legacy: true,
        globalInjection: true,
    })
    context.vueTestUtils.config.global.plugins.push(context.i18nInstance)
}

export const addFilter = (name: any, lambda: any): any => {
    return (context: { vue: any[] }) => context.vue.filter(name, lambda)
}

export const compositeConfiguration = (...configs: any[]): any => {
    return (context: any) => configs.forEach(config => config(context))
}

export const bootstrapVueContext = (configureContext: (arg0: {}) => any) => {
    const context: any = {}

    const teardownVueContext = () => {
        vi.unmock('vue')
        Object.keys(context).forEach(key => delete context[key])
        vi.resetModules()
    }

    context.vueTestUtils = vueTestUtils
    context.vue = createApp({})

    vi.doMock('vue', () => context.vue)

    configureContext && configureContext(context)

    return {
        teardownVueContext,
        ...context
    }
}

export const shallowMount = (component: any, context: any) => {
    return context.vueTestUtils.shallowMount(component, {
        localVue: context.localVue,
        vuetify: context.vuetifyInstance,
        i18n: context.i18nInstance,
        store: context.store,
        router: context.routerInstance,
        propsData: context.propsData,
        stubs: context.stubs,
        mocks: context.mocks,
        slots: context.slots,
        attachTo: context.attachTo
    })
}

export const mountWrapper = (component: any, context: any) => {
    return context.vueTestUtils.mount(component, {
        localVue: context.localVue,
        vuetify: context.vuetifyInstance,
        i18n: context.i18nInstance,
        store: context.store,
        router: context.routerInstance,
        propsData: context.propsData,
        stubs: context.stubs,
        mocks: context.mocks,
        slots: context.slots,
        attachTo: context.attachTo
    })
}
