// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";
import {langs} from "./utils/languages";

export default defineNuxtConfig({
  // @ts-ignore
  ssr: true,
  nitro: {
    compressPublicAssets: true
  },
  devtools: { enabled: false },
  components: true,
  // @ts-ignore
  css: ['@/assets/main.scss'],
  build: {
    transpile: ['vuetify'],
  },
  delayHydration: {
    mode: 'manual'
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-delay-hydration',
    process.env.NODE_ENV === 'production' ? async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        config.plugins?.push(
          vuetify({
            styles: { configFile: "assets/variables.scss" },
          })
        ) as any
      );
    }: undefined,
  ],
  i18n: {
    locales: langs,
    vueI18n: './locales/i18n.config.ts'
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    ssr: {
      noExternal: ['vuetify'],
    }
  }
})
