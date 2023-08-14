// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";
import {langs} from "./utils/languages";
import fs from 'fs-extra'

export default defineNuxtConfig({
  // @ts-ignore
  ssr: true,

  devServer: {
    host: 'nash-dev.local',
    port: 3000,
    https: {
      key: fs.readFileSync('./nash-dev.local-key.pem').toString(),
      cert: fs.readFileSync('./nash-dev.local.pem').toString()
    }
  },

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
    ['nuxt-purgecss', {
    safelist: {
      greedy: [
        /v-application/, // generated by vApp
        /v-layout/, // generated by vApp
        /v-toolbar/, // generated by vAppBar
        /v-locale/,  // generated runtime by i.e vBtn if locale enabled
        /v-icon/,  // generated by vBtn
        /flex-grow-1/, // generated by v-spacer
        /v-responsive/, // generated eager
        /v-ripple/, // when enabled, generated at runtime by vBtn
        /v-app/,
        /v-app-bar/,
        /v-app-bar-nav-icon/,
        /v-navigation-drawer/,
        /v-toolbar-title/,
        /v-container/,
        /v-sheet/,
        /v-main/,
        /v-card/,
        /v-btn/,
        /v-col/,
        /v-row/,
        /v-select/,
        /v-field/,
        /v-list-item/
      ]
    }
    }],
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
    // define: {
    //   'process.env.DEBUG': false,
    // },
    // ssr: {
    //   noExternal: ['vuetify'],
    // }
  }
})
