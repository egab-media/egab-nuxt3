import { setActivePinia, createPinia } from 'pinia'
import { useLanguageStore } from './index'
import { describe, beforeEach, it, expect } from 'vitest'

describe('Language store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })
    it('should get correct direction for the language', function () {
        const { getDir } = useLanguageStore()
        expect(getDir('en')).toEqual('ltr')
        expect(getDir('ar')).toEqual('rtl')
    });
})
