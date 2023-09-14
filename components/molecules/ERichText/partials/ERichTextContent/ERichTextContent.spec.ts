import { describe, beforeEach, afterEach, expect, it } from 'vitest'
import ERichTextContent from './Index.client.vue'
import { VueWrapper } from '@vue/test-utils'
import { bootstrapVueContext, compositeConfiguration, mountWrapper } from '~/test-utils'

let wrapper: VueWrapper<typeof ERichTextContent>
let vueContext: any

const findTextContent = () => wrapper.find('[data-test="value"]')

describe('ERichTextContent', () => {
  vueContext = bootstrapVueContext(compositeConfiguration())
  vueContext.propsData = {
    editor: {}
  }
  beforeEach(() => { wrapper = mountWrapper(ERichTextContent, vueContext) })
  afterEach(() => { vueContext.teardownVueContext() })

  it('should mount', function () {
    expect(findTextContent().exists()).toBe(true)
    expect(findTextContent().attributes('class')).toEqual('vuetify-pro-tiptap-editor__content')
    expect(wrapper.vm.markdownTheme()).toEqual('default')
  })

  it('should check markdownTheme prop', async function () {
    await wrapper.setProps({ markdownTheme: false })
    expect(wrapper.vm.markdownTheme()).toEqual('default')
    await wrapper.setProps({ markdownTheme: 'github' })
    expect(wrapper.vm.markdownTheme()).toEqual('github')
  })

  it('should check styles', function () {
    expect(wrapper.vm.contentDynamicClasses()).toStrictEqual([ { __dark: false }, undefined ])
    expect(wrapper.vm.contentDynamicClasses()).toStrictEqual([ { __dark: false }, undefined ])
    expect(wrapper.vm.contentDynamicStyles()).toStrictEqual({
      minHeight: '100px',
      maxHeight: undefined,
      overflow: 'auto',
      maxHeightStyle: {
        maxWidth: undefined,
        width: undefined,
        margin: undefined,
        backgroundColor: '#FFFFFF'
      }
    })
  })
})
