import { vi, beforeAll } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// import { createI18n } from 'vue-i18n';
// import en from '../locales/en-US.json';
// import ar from '../locales/ar-EG.json';
// import { createTestingPinia } from '@pinia/testing'

(global as any).CSS = { supports: () => false };

export const addVuetify = (context: any) => {
    context.vuetifyInstance = createVuetify({
        components,
        directives,
    });
    context.vueTestUtils.config.global.plugins = [context.vuetifyInstance];
    context.vueTestUtils.config.global.CSS = { supports: () => false };
};

// export const addPinia = (context: any) => {
//     context.vueTestUtils.config.global.plugins.push(createTestingPinia())
// }

export const compositeConfiguration = (...configs: any[]): any => {
    return (context: any) => configs.forEach((config) => config(context));
};

// export const addI18n = (context: any): any => {
//     // eslint-disable-next-line new-cap
//     context.i18nInstance = createI18n({
//         // ...options,
//         messages: { en, ar },
//         fallbackLocale: 'en',
//         locale: 'en',
//     });
//     context.vueTestUtils.config.global.plugins = [context.i18nInstance];
// };

export const bootstrapVueContext = (configureContext: (arg0: {}) => any) => {
    const context: any = {};
    const teardownVueContext = () => {
        vi.unmock('vue');
        Object.keys(context).forEach((key) => delete context[key]);
        vi.resetModules();
    };

    context.vueTestUtils = require('@vue/test-utils');
    // context.vueTestUtils.config.stubs.nuxt = { template: '<div />' }
    // context.vueTestUtils.config.stubs['nuxt-link'] = { template: '<a><slot /></a>' }
    // context.vueTestUtils.config.stubs['no-ssr'] = { template: '<span><slot /></span>' }

    context.vue = require('vue');
    // context.localVue = context.vueTestUtils.createLocalVue()

    vi.doMock('vue', () => context.vue);

    configureContext && configureContext(context);

    return {
        teardownVueContext,
        ...context,
    };
};

beforeAll(() => {
    global.CSS = {
        supports: (str: string) => false,
        escape: (str: string) => str,
    };
});

// Simulate the structure of `index.html`
const div = document.createElement('div');
div.id = 'app';
document.body.appendChild(div);

export const customWrapper = (component: any, context: any) => {
    return context.vueTestUtils.shallowMount(component, {
        localVue: context.localVue,
        store: context.store,
        router: context.routerInstance,
        propsData: context.propsData,
        stubs: context.stubs,
        mocks: context.mocks,
        slots: context.slots,
        attachTo: context.attachTo,
    });
};

export const mountWrapper = (component: any, context: any) => {
    return context.vueTestUtils.mount(component, {
        localVue: context.localVue,
        store: context.store,
        router: context.routerInstance,
        propsData: context.propsData,
        stubs: context.stubs,
        mocks: context.mocks,
        slots: context.slots,
        attachTo: context.attachTo,
    });
};
