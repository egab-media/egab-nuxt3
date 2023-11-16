import { useI18n } from 'vue-i18n'
import * as ruleSpecs from '~/utils/allRules'

export function useRules() {
  const { t } = useI18n()
  const reservedRules = {
    required: (val: string) => ruleSpecs.required(val, t('auth.form.validation.required') as string),
    blank: (val: string) => ruleSpecs.blank(val, 'cannot be blank') as string,
    email: (val: string) => ruleSpecs.email(val, t('auth.form.validation.email') as string),
    alpha: (val: string) => ruleSpecs.alpha(val, t('auth.form.validation.alpha') as string),
    titleMinChars: (val: string) => ruleSpecs.titleMinChars(val, t('auth.form.validation.titleMinChars') as string),
    fullNameMinChars: (val: string) => ruleSpecs.fullNameMinChars(val, t('auth.form.validation.fullNameMinChars') as string),
    hasLowercase: (val: string) => ruleSpecs.hasLowercase(val, t('auth.form.validation.hasLowercase') as string),
    hasUppercase: (val: string) => ruleSpecs.hasUppercase(val, t('auth.form.validation.hasUppercase') as string),
    hasNumber: (val: string) => ruleSpecs.hasNumber(val, t('auth.form.validation.hasNumber') as string),
    hasSpecial: (val: string) => ruleSpecs.hasSpecial(val, t('auth.form.validation.hasSpecial') as string),
    minchars: (val: string) => ruleSpecs.minchars(val, t('auth.form.validation.minchars') as string),
    url: (val: string) => ruleSpecs.url(val)
  } as any

  /**
     * @method handleRules
     * This takes the string values of the passed 'rules' prop
     * and returns the corresponding reserved functions stored in ~/utils/allRules.ts
     * ---
     * This is engineered for 4 reasons:
     * 1. To ensure having singularity for common validation rules all over the software
     * 2. To avoid multiple imports for the same rules in every parent component
     * 3. To isolate the rules as a business logic for unit testing and benchmarking
     * 4. To easily maintain the rules from ~/utils/allRules.ts file
     * ---
     * @returns Array<Function>
     */
  const handleRules = (rules: Array<string>) => {
    const finalRules: any = []

    rules.forEach((key: string | any) => {
      if (typeof key !== 'string') {
        finalRules.push(key)
      }

      if (key in reservedRules) {
        finalRules.push(reservedRules[key])
      }
    })
    return finalRules
  }

  return { handleRules }
}
