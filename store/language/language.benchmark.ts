import { setActivePinia, createPinia } from 'pinia'
import { describe, bench } from 'vitest'
import { useLanguageStore } from './index'

describe('Language benchmarking', () => {
  setActivePinia(createPinia())
  bench('get direction', () => {
    useLanguageStore().getDir('ar')
  })
})
