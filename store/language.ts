import { defineStore } from 'pinia';
import { Language, langs } from '~/utils/languages';

const getDefaultState = () => ({
    languages: langs as Array<Language>,
});

type RootState = ReturnType<typeof getDefaultState>;

export const useLanguageStore = defineStore('language', {
    state: getDefaultState,
    getters: {
        getDir:
            (state: RootState) =>
                (locale: string): string => {
                    const currentLang: Language = state.languages.find(
                        (lang) => lang.code === locale
                    )!;
                    return currentLang.dir!;
                },
    },
    actions: {},
});
