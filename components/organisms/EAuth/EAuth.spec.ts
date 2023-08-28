import { nextTick } from 'vue'
import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest'
import { VueWrapper } from '@vue/test-utils'
import EAuth from './Index.vue'
import {
  addI18n,
  addVuetify,
  bootstrapVueContext,
  compositeConfiguration,
  mountWrapper
} from '@/test-utils'
import ETextField from '@/components/ETextField/Index.vue'

type RelaxedVue = typeof EAuth & {
    form: {
        email: string
        name: string
    }
}

let wrapper: VueWrapper<RelaxedVue>

const findAuthWrapper = () => wrapper.find('[data-test="auth-wrapper"]')
const findEmailInput = () => wrapper.find('[data-test="email"]')
const findForm = () => wrapper.find('[data-test="form"]')
const findBtn = () => wrapper.find('[data-test="action-btn"]')
const findSubheader = () => wrapper.find('[data-test="subheader"]')
const findError = () => wrapper.find('[data-test="error"]')
const findNameInput = () => wrapper.find('[data-test="name-input"]')
const findSurveySelect = () => wrapper.find('[data-test="survey-select"]')
const findSurveyOther = () => wrapper.find('[data-test="survey-other"]')
const findDisclaimer = () => wrapper.find('[data-test="disclaimer"]')

let vueContext: any

describe('EAuth', () => {
  vueContext = bootstrapVueContext(compositeConfiguration(addVuetify, addI18n))
  beforeEach(() => {
    vueContext.propsData = {
      isRegister: true,
      isEditor: true
    }
    vueContext.mocks = {
      $fireModule: {
        auth: {
          GoogleAuthProvider: class GoogleAuthProvider {}
        }
      },
      $fire: {
        auth: {
          signInWithPopup: vi.fn(() => new Promise(
            (resolve, _reject) => resolve({
              email: 'test@jest.io',
              userId: '123',
              isEmailVerified: false
            }))
          )
        }
      },
      $route: {
        params: {
          persona: 'journalist'
        },
        query: {
          action: 'login'
        }
      }
    }
    vueContext.components = { 'e-text-field': ETextField }

    wrapper = mountWrapper(EAuth, vueContext)
  })

  afterEach(() => {
    vueContext.teardownVueContext()
  })

  describe('DOM', () => {
    describe('Mounting', () => {
      it('should test wrapper', async () => {
        expect(findAuthWrapper().attributes('class')).not.toContain('px-6')
        wrapper.vm.$vuetify.display.mobile = false
        wrapper.vm.$vuetify.display.lg = true
        await nextTick()
        expect(findAuthWrapper().attributes('class')).toContain('px-6')
      })
      it('should render correct options', function () {
        expect(wrapper.vm.$options.name).toEqual('EAuth')
        expect(wrapper.vm.$options.props.isRegister).toEqual({ type: Boolean, default: true })
        expect(wrapper.vm.$options.props.isEditor).toEqual({ type: Boolean, default: true })
      })
    })

    describe('form', () => {
      it('should load the email input', async () => {
        expect(findEmailInput().exists()).toBe(true)
        expect(findEmailInput().find('label').text()).toBe('* work email')
        expect(findEmailInput().find('.v-messages__message').text()).toBe('Can\'t find your company? Please,  register here')
        await wrapper.setProps({
          isEditor: false
        })
        await nextTick()
        expect(findEmailInput().find('label').text()).toBe('* contact email')
        await wrapper.setProps({
          isRegister: false
        })
        await nextTick()
        expect(findEmailInput().find('label').text()).toBe('* your email')
        await findEmailInput().find('input').setValue('meow@me.com')
        expect(wrapper.vm.form.email).toBe('meow@me.com')
      })

      it('should load name input', async function () {
        expect(findNameInput().exists()).toBeTruthy()
        expect(findNameInput().find('label').text()).toEqual('* first and last name')
        await findNameInput().find('input').setValue('vitest')
        expect(wrapper.vm.form.name).toBe('vitest')
        expect(findNameInput().find('.v-counter').text()).toBe('1')
      })
    })
  })
})
