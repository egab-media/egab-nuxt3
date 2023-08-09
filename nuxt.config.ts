// https://nuxt.com/docs/api/configuration/nuxt-config
// import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  // @ts-ignore
  ssr: true,
  nitro: {
    compressPublicAssets: true
  },
  devtools: { enabled: true },
  // @ts-ignore
  css: [],
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use './public/overrides.scss' as *;`,
        },
      },
    },
    // hooks: {
    //   'vite:extendConfig': (config: ViteConfig) => {
    //     config.plugins!.push(
    //         // @ts-ignore
    //         vuetify({
    //           styles: {configFile: resolve('./public/overrides.scss')},
    //         })
    //     )
    //   }
    // },
  }
})
