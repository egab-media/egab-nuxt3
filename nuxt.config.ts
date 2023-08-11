// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";
import {langs} from "./utils/languages";
import {ViteConfig} from "@nuxt/schema";

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
  // sourcemap: {
  //   client: false,
  //   server: false,
  // },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    // async (options, nuxt) => {
    //   nuxt.hooks.hook("vite:extendConfig", (config) =>
    //     config.plugins?.push(
    //       vuetify({
    //         styles: { configFile: "assets/variables.scss" },
    //       })
    //     ) as any
    //   );
    // },
  ],
  experimental: {
    inlineSSRStyles: false,
    watcher: 'chokidar'
  },
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
    },
    hooks: {
      'vite:extendConfig': (config: ViteConfig) => {
        config.plugins!.push(
            // @ts-ignore
            vuetify({
              styles: {configFile: 'assets/variables.scss'},
            })
        )
      }
    },
    // server: {
    //   hmr: {
    //     protocol: 'wss',
    //     clientPort: 443,
    //     path: 'hmr/'
    //   }
    // }
  }
})
