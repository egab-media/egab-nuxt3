import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// import { VuetifyResolver } from 'unplugin-vue-components/resolvers'

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default {
  plugins: [
    vue({
      customElement: /e-/
    }),
    vuetify(),
    Components({
      dirs: ['~/components'],
      directoryAsNamespace: true,
      resolvers: [
        // VuetifyResolver()
      ],
      include: [/\.vue$/, /\.vue\?vue/, /\.stories\.ts$/, /\.[tj]s$/]
    }),
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/, /\.stories\.ts$/, /\.[tj]s$/],
      imports: ['vue', 'vue-router'],
      dirs: ['~/components'],
      vueTemplate: true
    }),
    VueI18nPlugin({
      globalSFCScope: false,
      fullInstall: true,
      runtimeOnly: false,
      useVueI18nImportName: true,
      allowDynamic: true,
      forceStringify: false,
      include: fileURLToPath(new URL('./locales/**', import.meta.url)) // provide a path to the folder where you'll store translation data (see below)
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url))
      // '#components': fileURLToPath(new URL('./.nuxt/components', import.meta.url))
    }
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    css: true,
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['text', 'json', 'html']
    },
    server: {
      deps: {
        inline: ['vuetify']
      }
    }
    // setupFiles: ['@vitest/web-worker']
  }
}
