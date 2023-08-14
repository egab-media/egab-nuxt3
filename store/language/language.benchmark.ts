import { setActivePinia, createPinia } from 'pinia'
import { useLanguageStore } from './index'
import { describe, bench } from 'vitest'

describe('Language benchmarking', () => {
    setActivePinia(createPinia())
    bench('get direction', () => {
        useLanguageStore().getDir('ar')
    })
})
