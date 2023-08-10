import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import { fileURLToPath, URL } from 'url';

export default {
    plugins: [vue({ customElement: true }), vuetify()],
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
        server: {
            deps: {
                inline: ['vuetify'],
            }
        },
        environment: 'jsdom',
    },
};
