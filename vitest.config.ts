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
        }),
        // VueI18nPlugin({
        //     globalSFCScope: false,
        //     fullInstall: true,
        //     runtimeOnly: false,
        //     useVueI18nImportName: true,
        //     include: resolve(dirname(fileURLToPath(import.meta.url)), './locales/**'), // provide a path to the folder where you'll store translation data (see below)
        // })
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
