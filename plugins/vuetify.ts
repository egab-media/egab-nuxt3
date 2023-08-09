import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { VBtn } from 'vuetify/components/VBtn'
export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        aliases: { VBtnPrimary: VBtn },
        defaults: {
            VBtnPrimary: {
                class: ['v-btn--primary']
            }
        },
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: { mdi }
        }
    })

    nuxtApp.vueApp.use(vuetify)
})
