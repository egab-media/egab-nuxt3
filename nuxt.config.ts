// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";
import {langs} from "./utils/languages";

export default defineNuxtConfig({
    // @ts-ignore
    ssr: true,

    app: {
        head: {
            link: [
                {
                    rel: 'preload',
                    as: 'document',
                    href: './fonts/panton/5920187ef0bf42859293e1ea01545b96.woff2',
                    type: 'font/woff2',
                    crossorigin: 'anonymous'
                }
            ]
        }
    },

    nitro: {
        preset: 'render_com',
        routing: {
            routeRules: {
                '/assets/': {headers: {'cache-control': 'maxage=31536000 s-maxage=31536000'}},
                '/public/': {headers: {'cache-control': 'maxage=31536000 s-maxage=31536000'}}
            }
        },
        compressPublicAssets: true
    },

    devtools: {enabled: false},

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
        '@vite-pwa/nuxt',
        '@nuxt/image',
        ['nuxt-purgecss', {
            enabled: true,
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
                    /v-text-field/,
                    /v-input/,
                    /v-progress-linear/,
                    /v-list-item/
                ]
            }
        }],
        process.env.NODE_ENV === 'production' ? async (options, nuxt) => {
            nuxt.hooks.hook("vite:extendConfig", (config) =>
                config.plugins?.push(
                    vuetify({
                        styles: {configFile: "assets/variables.scss"},
                    })
                ) as any
            );
        } : undefined,
    ],

    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: "Egab Portal",
            short_name: "Egab",
            icons: [
                {
                    src: "android-chrome-192x192.png",
                    sizes: "192x192",
                    type: "image/png"
                },
                {
                    src: "android-chrome-256x256.png",
                    sizes: "256x256",
                    type: "image/png"
                }
            ],
            theme_color: "#ffffff",
            background_color: "#ffffff",
            display: "standalone"
        },
        workbox: {
            navigateFallback: '/',
            globPatterns: ['**/*.{js,css,html,png,svg,ico,ttf,eot,woff,woff2,svg}'],
            runtimeCaching: [
                {
                    urlPattern: './fonts/panton/5920187ef0bf42859293e1ea01545b96.woff2',
                    handler: 'CacheFirst',
                    method: 'GET',
                    options: {
                        cacheableResponse: {statuses: [0, 200]}
                    }
                },
                {
                    urlPattern: 'https://flagcdn.com/w40/us.png',
                    handler: 'CacheFirst',
                    method: 'GET',
                    options: {
                        cacheableResponse: {statuses: [0, 200]}
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
    },
})
