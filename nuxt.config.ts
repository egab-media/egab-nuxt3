// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
import colors from 'vuetify/lib/util/colors.mjs'
import { langs } from './utils/languages'

export default defineNuxtConfig({
  // @ts-ignore
  ssr: true,

  app: {
    head: {
      link: [
        {
          rel: 'preload',
          as: 'font',
          href: './fonts/panton/5920187ef0bf42859293e1ea01545b96.woff2',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        }
      ]
    }
  },

  nitro: {
    preset: 'render_com',
    // @ts-ignore
    routing: {
      routeRules: {
        '/assets/': { headers: { 'cache-control': 'maxage=31536000 s-maxage=31536000' } },
        '/public/': { headers: { 'cache-control': 'maxage=31536000 s-maxage=31536000' } }
      }
    },
    compressPublicAssets: true
  },

  devServer: {
    https: {
      key: 'nash-dev.local-key.pem',
      cert: 'nash-dev.local.pem'
    }
  },

  devtools: { enabled: false },

  components: true,
  // @ts-ignore
  css: ['@/assets/main.scss'],

  build: {
    transpile: ['vuetify']
  },

  delayHydration: {
    mode: 'manual'
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-delay-hydration',
    '@vite-pwa/nuxt',
    '@nuxt/image',
    'nuxt-security',
    '@nuxtjs/eslint-module',
    '@invictus.codes/nuxt-vuetify',
    ['nuxt-purgecss', {
      enabled: true,
      safelist: {
        greedy: [
          /v-application/, // generated by vApp
          /v-layout/, // generated by vApp
          /v-toolbar/, // generated by vAppBar
          /v-locale/, // generated runtime by i.e vBtn if locale enabled
          /v-icon/, // generated by vBtn
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
          /v-menu/,
          /v-field/,
          /v-text-field/,
          /v-input/,
          /v-progress-linear/,
          /v-label/,
          /v-list-item/,
          /v-tooltip/
        ]
      }
    }]
    // process.env.NODE_ENV === 'production'
    //   ? async (_, nuxt) => {
    //     await nuxt.hooks.hook('vite:extendConfig', config =>
    //       config.plugins?.push(
    //         vuetify({
    //           styles: { configFile: 'assets/variables.scss' }
    //         })
    //       ) as any
    //     )
    //   }
    //   : undefined
  ],

  vuetify: {
    vuetifyOptions: {
      icons: {
        sets: {
          custom: {
            // @ts-ignore
            EIconGoogle: {
              component: () => import('@/components/icons/EIconGoogle/Index.vue'),
              props: {
                name: 'EIconGoogle'
              }
            }
          }
        }
      },
      theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              /**
               * use primary darken-1 for luminescent-green-800
               * use primary lighten-2 for luminescent-green-400
               * use primary-50 for luminescent-green-50
               * use primary-100 for luminescent-green-100
               */
              primary: '#77A11D',
              'primary-20': '#ACCD53',
              'primary-50': '#F4F8E7',
              'primary-100': '#e3edc3',
              accent: colors.grey.darken3,
              secondary: '#C76758',
              info: '#4AA1B3',
              warning: '#F89A35',
              error: '#DA756C',
              success: colors.green.accent3
            }
          },
          dark: {
            dark: true,
            colors: {
              primary: '#77A11D',
              'primary-20': '#ACCD53',
              'primary-50': '#F4F8E7',
              'primary-100': '#e3edc3',
              accent: colors.grey.darken3,
              secondary: '#C76758',
              info: '#4AA1B3',
              warning: colors.amber.base,
              error: '#DA756C',
              success: colors.green.accent3
            }
          }
        }
      }
    },
    moduleOptions: {
      // @ts-ignore
      treeShaking: true,
      useIconCDN: false,
      styles: {
        configFile: 'assets/variables.scss'
      }
    }
  },

  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
      contentSecurityPolicy: {
        'base-uri': ["'self'"],
        'font-src': ["'self'", 'https:', 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'img-src': ["'self'", 'https: data:'],
        'object-src': ["'none'"],
        'script-src-attr': ["'none'"],
        'style-src': ["'self'", 'https:', "'unsafe-inline'"],
        'upgrade-insecure-requests': true
      }
    }
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Egab Portal',
      short_name: 'Egab',
      icons: [
        {
          src: 'android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'android-chrome-256x256.png',
          sizes: '256x256',
          type: 'image/png'
        }
      ],
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone'
    },
    workbox: {
      globPatterns: ['**/*.{png,woff2}'],
      runtimeCaching: [
        {
          urlPattern: './fonts/panton/5920187ef0bf42859293e1ea01545b96.woff2',
          handler: 'CacheFirst',
          method: 'GET',
          options: {
            cacheableResponse: { statuses: [0, 200] }
          }
        },
        {
          urlPattern: 'https://flagcdn.com/w40/us.png',
          handler: 'CacheFirst',
          method: 'GET',
          options: {
            cacheableResponse: { statuses: [0, 200] }
          }
        },
        {
          urlPattern: 'https://flagcdn.com/w40/sa.png',
          handler: 'CacheFirst',
          method: 'GET',
          options: {
            cacheableResponse: { statuses: [0, 200] }
          }
        }
      ]
    },
    client: {
      installPrompt: true
    },
    devOptions: {
      enabled: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  },

  i18n: {
    locales: langs,
    vueI18n: './locales/i18n.config.ts'
  }
})
