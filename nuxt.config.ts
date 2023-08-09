// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";
import {ViteConfig} from "@nuxt/schema";

export default defineNuxtConfig({
  // @ts-ignore
  ssr: true,
  nitro: {
    compressPublicAssets: true
  },
  devtools: { enabled: true },
  // @ts-ignore
  css: ['@/public/main.scss'],
  build: {
    transpile: ['vuetify'],
  },
  modules: [],

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    ssr: {
      noExternal: ['vuetify'],
    },
    hooks: {
      'vite:extendConfig': (config: ViteConfig) => {
        config.plugins!.push(
            // @ts-ignore
            vuetify({
              styles: {configFile: 'public/variables.scss'},
            })
        )
      }
    },
  }
})
