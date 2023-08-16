import { VueWrapper } from '@vue/test-utils';
import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import {addVuetify, bootstrapVueContext, compositeConfiguration, mountWrapper} from "@/test-utils";
// import { debug } from 'vitest-preview';
import ENav from './Index.vue'
import {VApp} from "vuetify/components/VApp";

let wrapper: VueWrapper<any>;
let vueContext: any;

const Component = {
    template: `
        <v-app>
            <ENav />
        </v-app>
    `,
    components: {
        VApp,
        ENav
    }
}

describe('ENav', () => {
    vueContext = bootstrapVueContext(compositeConfiguration(addVuetify))
    beforeEach(() => {
        vueContext.stubs = ['v-lazy']
        wrapper = mountWrapper(Component, vueContext)
    })
    afterEach(() => {
        vueContext.teardownVueContext()
    })

    it('should test the component', () => {
        expect(wrapper.vm).toBeTruthy()
    })
})
