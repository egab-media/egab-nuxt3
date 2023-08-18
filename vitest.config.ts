import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import {fileURLToPath, resolve, URL} from 'url';
import AutoImport from 'unplugin-auto-import/vite'
// import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
// import {dirname} from "pathe";

export default {
    plugins: [
        vue({ customElement: true }),
        vuetify(),
        AutoImport({
            imports: [
                'vue',
                'vue-router'
            ]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./', import.meta.url)),
            '~': fileURLToPath(new URL('./', import.meta.url)),
            // '@': path.resolve(__dirname, '.'),
        },
    },
    test: {
        globals: true,
        css: true,
        coverage: {
            enabled: true,
            provider: 'istanbul',
            reporter: ['text', 'json', 'html']
        },
        server: {
            deps: {
                inline: ['vuetify'],
            }
        },
        environment: 'happy-dom',
    },
};
