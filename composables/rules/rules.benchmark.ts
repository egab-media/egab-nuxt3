import {bench, vi, describe} from 'vitest'
import {useRules} from './index'

vi.mock('vue-i18n', () => ({
    useI18n: () => ({
        t: (key: string) => key,
        d: (key: string) => key,
    }),
}));

describe('bench', function () {
    bench('check', () => {
        const {handleRules} = useRules()
        handleRules(['required', 'email', 'alpha', 'blank', 'titleMinChars', 'fullNameMinChars']).forEach((fn: Function) => fn(''))
    })
});
