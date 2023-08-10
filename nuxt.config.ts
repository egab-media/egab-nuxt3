// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";
import en from './locales/en-US.json'
import ar from './locales/ar-SA.json'

export default defineNuxtConfig({
  // @ts-ignore
  ssr: true,
  nitro: {
    compressPublicAssets: true
  },
  devtools: { enabled: true },
  // @ts-ignore
  css: ['@/assets/main.scss'],
  build: {
    transpile: ['vuetify'],
  },
  sourcemap: {
    client: false,
    server: false,
  },
  modules: [
    '@pinia/nuxt',
    '@leanera/nuxt-i18n',
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // @ts-ignore
        config.plugins.push(
          vuetify({
            styles: { configFile: "assets/variables.scss" },
          })
        )
      );
    },
  ],

  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    messages: {
      en,
      ar
    }
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
