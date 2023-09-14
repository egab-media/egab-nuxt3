import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest'
import { VueWrapper } from '@vue/test-utils'
import ERichTextFooter from './Index.client.vue'
import { addVuetify, bootstrapVueContext, compositeConfiguration, mountWrapper } from '~/test-utils'

let wrapper: VueWrapper<typeof ERichTextFooter>
let vueContext: any

const findWordsSpan = () => wrapper.find('[data-test="words"]')
const findCharsSpan = () => wrapper.find('[data-test="chars"]')

describe('ERichTextFooter', function () {
  vueContext = bootstrapVueContext(compositeConfiguration(addVuetify))
  vueContext.propsData = {
    editor: {
      storage: {
        characterCount: {
          words: vi.fn(),
          characters: vi.fn()
        }
      }
    }
  }
  beforeEach(() => { wrapper = mountWrapper(ERichTextFooter, vueContext) })
  afterEach(() => { vueContext.teardownVueContext() })

  it('should mount', function () {
    expect(findWordsSpan().text()).toContain('Words')
    expect(findCharsSpan().text()).toContain('characters')
  });
});
