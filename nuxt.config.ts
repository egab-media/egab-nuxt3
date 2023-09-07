// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'
import { langs } from './utils/languages'

const ONE_DAY = 60 * 60 * 24 * 1000
const ONE_WEEK = ONE_DAY * 7

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

  runtimeConfig: {
    //  private
    firebaseAdmin: {
      project_id: 'egab-staging',
      private_key_id: 'b3639900bbb0f5e5c9bcaf28aa1d14e5a7dcd0b4',
      private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCj2U7laodej+T9\nkhA9XEMgD0XID10l7T5m+l8L9G8+cYkpj+0GADVdAIdWeaez4+IZQ3IRTQxzoK2v\nxVQzpG/CWKI19zQZFHwIt83EftmYG/Fwr11xvNT7Y9orfozWsdcXQ/E5SUiEe8FU\nAlwl9wVyWE2XVkmS9i1cS+s35CCiFf6zcKivput2M/m5vJQTMlX7L+8XXsRCBG6e\nrxazj6GKXIQyHpAIo8E6tRRSZCYhAG3wInwL/MQa9iQKEI/LiX7itNSpZLuG8nrj\nUBv7gNTjCk8P2093riQ5Is2krEqDaDMP+muIDSUF54WePe48E49trYK+e1lZD2JW\nSdYd4Ia9AgMBAAECggEAILcLi0AdflKR4NVwu6e32WdjQgJbUW7Q1mPoZW0tZxTp\nU6yioV+aSBMKcshApWj7ZJr0ZCLzuQScmWt3mAYdsHrdDJRqyRUvfNgiVDkVvkra\nButk54hSKE20KpoOifGhZkpRGGSa/6TsIZeFCamMY1vhRjXa4+aWgQbBlPvOTj5u\n2tyoFgHg5UGwsdykft2+Kztt8/IJqQNSEueWIiDNrYXgf8skd4HlrcwCTURH3Cn/\nJilsRArI6dR7jajylOmq7udI54kuXZ2PynbS7o29XE8iAm8jlgsnn0hLpDc21ZXK\nwHi0xZfOWjUoP6h5vWkGeRaO442FsC3Yw+cHQsX0iwKBgQDh0Uin8kSS5cNq8HTO\nlEDvQuEZmOSQUPpR0HXo2WLwg4oJ6PblJxUshcHhJgVInHmzR2XvKwYWwSH21wxD\nXjm4vMnqS0ErpE1MlbxeQSIyblPvmDo31KbWEoy4HkeHv98MuBNPmkAqs/SQoTsQ\naGLae1YJ5oFFEwHxxuaOuMDv4wKBgQC5v6pTvD2J8zH8Ak/Bl764kJ8FjfjRE2JD\nu5h7jgi8wimamf+5JlrrYTbFUW6pFBPJYK6m2aVSl8n083bbxcOD+QPLX2YrG3Me\njcXf/wFd2uS2g6/11kpTukOV8MOQsdGCU5H7oh4C8AhozISxXGpUM8WMHJaaaGVS\nFbm/Oecw3wKBgDtS4NSGN++jftgcPYN7vSdeGYbA/OLQ80IFEsTOP0jSNbRuyFXh\nE5XzucBtXZv6x5oKmsPfOKVHraWMT0NvgJiAuEbd6EwPyOLiv26/i71V8KUUB89d\nBUtd6iwAgGgwRuevgBs8ebj+N7S7NqoT0kx1dF/7d2BvIuaiizVZYg5jAoGARn8Y\nvOj/jiCvws55yKa36sJwqCIG4gryS3SiXZo9dK5YLeXuqS2GajkeGWtbjW4iSFaa\nUpbd6OfU7VONs8Ft/+N9bi1J0Gh9m4YBKI9WzHEsRpzaJnprATX7OqgDASKLumPP\nTupra4AAIQ4l+k5xyH1Rp2iePAINGkdGlO378Y8CgYEArBS781ooTe3zk3/sQ991\nU7WQOOj2GrMWXJePOiX6FgHXyYhH2fn3icl5c2G3PGDvPArwGzefbuFpYdfCWZOn\n6tllw+x+MjfKU4JIMcLmDU9FkUk2jjHWaxfNHmZA8ZoqouJ2lFp7G+jdGkDptR3L\nUwWHlDjBrnM/KM0XUuIa66A=\n-----END PRIVATE KEY-----\n',
      client_email: 'firebase-adminsdk-uviw7@egab-staging.iam.gserviceaccount.com',
      client_id: '103454563138954494611'
    },
    //  public
    public: {
      firebaseAuthCookie: {
        name: 'authCookie',
        lifetime: parseInt(ONE_WEEK.toString(), 10),
        domain: 'nash-dev.local',
        path: '/',
        sameSite: 'lax'
      },
      // authCookieName: '__session',
      // authCookieExpires: parseInt(ONE_WEEK.toString(), 10),
      firebase: {
        apiKey: 'AIzaSyDDHJah7UV8pPQOsQze40KxbVBFgw7_e_0',
        authDomain: 'egab-staging.firebaseapp.com',
        databaseURL: 'https://egab-staging-default-rtdb.europe-west1.firebasedatabase.app',
        projectId: 'egab-staging',
        storageBucket: 'egab-staging.appspot.com',
        messagingSenderId: '290778158311',
        appId: '1:290778158311:web:b327e4fc359ecde0f7be42'
      }
    }
  },

  nitro: {
    preset: 'render_com',
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
          /v-list-item/
        ]
      }
    }],
    process.env.NODE_ENV === 'production'
      ? async (_, nuxt) => {
        await nuxt.hooks.hook('vite:extendConfig', config =>
          config.plugins?.push(
            vuetify({
              styles: { configFile: 'assets/variables.scss' }
            })
          ) as any
        )
      }
      : undefined
  ],

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
      globPatterns: ['**/*.{js,css,html,png,woff2}'],
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
