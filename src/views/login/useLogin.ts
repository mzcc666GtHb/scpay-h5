import type { FieldRule } from 'vant'

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
}

const currentState = ref(LoginStateEnum.LOGIN)

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state
  }

  const getLoginState = computed(() => currentState.value)

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN)
  }

  return { setLoginState, getLoginState, handleBackLogin }
}

export function useFormRules(formData?: Recordable) {
  // 密码：支持数字、字符，不区分大小写，最多 20 位
  const validatePassword = async (value: string, _: FieldRule) => {
    if (!value) {
      return Promise.resolve(true) // 空值时不显示提示
    }
    if (!/^[A-Z0-9]{1,20}$/i.test(value)) {
      return Promise.resolve('密码支持数字和字符，且不超过20位')
    }
    return Promise.resolve(true)
  }
  const getPasswordFormRule = computed<FieldRule[]>(() => [
    { validator: validatePassword, trigger: 'onBlur' as const },
  ])

  const validateSms = async (value: string, _: FieldRule) => {
    if (!value) {
      return Promise.resolve(true) // 空值时不显示提示
    }
    return Promise.resolve(true)
  }
  const getSmsFormRule = computed<FieldRule[]>(() => [
    { validator: validateSms, trigger: 'onBlur' as const },
  ])
  // 手机号：仅数字，最多 10 位
  const validateMobile = async (value: string, _: FieldRule) => {
    if (!value) {
      return Promise.resolve(true) // 空值时不显示提示
    }
    if (!/^\d{1,10}$/.test(value)) {
      return Promise.resolve('手机号码仅支持数字，且不超过10位')
    }
    return Promise.resolve(true)
  }
  const getMobileFormRule = computed<FieldRule[]>(() => [
    { validator: validateMobile, trigger: 'onBlur' as const },
  ])

  const validateConfirmPassword = (password?: string) => {
    return async (value: string) => {
      if (!value) {
        return Promise.resolve(true) // 空值时不显示提示
      }
      if (value !== (password ?? '')) {
        return Promise.resolve('两次输入密码不一致')
      }
      return Promise.resolve(true)
    }
  }

  const getFormRules = computed((): { [k: string]: FieldRule[] } => {
    const passwordFormRule = unref(getPasswordFormRule)
    const smsFormRule = unref(getSmsFormRule)
    const mobileFormRule = unref(getMobileFormRule)

    const mobileRule: Record<string, FieldRule[]> = {
      sms: smsFormRule,
      mobile: mobileFormRule,
    }
    switch (unref(currentState)) {
      // register form rules
      case LoginStateEnum.REGISTER:
        return {
          password: passwordFormRule,
          confirmPassword: [
            { validator: validateConfirmPassword(formData?.password), trigger: 'onBlur' as const },
          ],
          // policy: [{ validator: validatePolicy, trigger: 'onBlur' }],
          ...mobileRule,
        }

      // reset password form rules
      case LoginStateEnum.RESET_PASSWORD:
        return {
          mobile: mobileFormRule,
          sms: smsFormRule,
          password: passwordFormRule,
          confirmPassword: [
            { validator: validateConfirmPassword(formData?.password), trigger: 'onBlur' as const },
          ],
        }

      // login form rules
      default:
        return {
          mobile: mobileFormRule,
          sms: smsFormRule,
          password: passwordFormRule,
        }
    }
  })
  return { getFormRules }
}
