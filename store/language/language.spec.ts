import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, expect } from 'vitest'
import { useLanguageStore } from './index'
import { Direction } from '~/utils/languages'

describe('Language store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should get correct direction for the language', function () {
    const { languages, getDir } = useLanguageStore()
    expect(getDir('en')).toEqual('ltr')
    expect(getDir('ar')).toEqual('rtl')

    languages.push({
      code: 'es',
      iso: 'es-ES',
      name: 'Spanish',
      file: 'es-ES.json',
      dir: Direction.ltr,
      flag: 'https://flagcdn.com/w40/es.png'
    })

    expect(getDir('es')).toEqual('ltr')
  })
})
