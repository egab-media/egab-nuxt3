// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";

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

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    ssr: {
      noExternal: ['vuetify'],
    }
  }
})
