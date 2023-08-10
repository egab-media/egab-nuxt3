import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { VBtn } from 'vuetify/components/VBtn'
import { Intersect } from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        aliases: { VBtnPrimary: VBtn },
        directives: [Intersect],
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
