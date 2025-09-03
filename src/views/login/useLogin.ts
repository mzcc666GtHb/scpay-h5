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
  const getUsernameFormRule = computed(() => createRule('请输入用户名'))
  // 密码：仅字母与数字，最多 20 位
  const getPasswordFormRule = computed(
    () =>
      [
        ...createRule('请输入密码'),
        { pattern: /^[A-Za-z0-9]{1,20}$/, message: '仅支持字母与数字，且不超过20位', trigger: 'onBlur' },
      ] as FieldRule[],
  )
  const getSmsFormRule = computed(() => createRule('请输入短信验证码'))
  // 手机号：仅数字，最多 10 位
  const validateMobile = async (value: string, _: FieldRule) => {
    if (!value) return Promise.resolve('请输入手机号码')
    if (!/^\d{1,10}$/.test(value)) return Promise.resolve('手机号码仅支持数字，且不超过10位')
    return Promise.resolve(true)
  }
  const getMobileFormRule = computed<FieldRule[]>(() => [
    { validator: validateMobile, trigger: 'onBlur' as const },
  ])

  const validateConfirmPassword = (password?: string) => {
    return async (value: string) => {
      if (!value) {
        return Promise.resolve('请输入确认密码')
      }
      if (value !== (password ?? '')) {
        return Promise.resolve('两次输入密码不一致')
      }
      return Promise.resolve(true)
    }
  }

  const getFormRules = computed((): { [k: string]: FieldRule[] } => {
    const usernameFormRule = unref(getUsernameFormRule)
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
          username: usernameFormRule,
          ...mobileRule,
        }

      // login form rules
      default:
        return {
          username: usernameFormRule,
          password: passwordFormRule,
        }
    }
  })
  return { getFormRules }
}

function createRule(message: string): FieldRule[] {
  return [
    {
      required: true,
      message,
      trigger: 'onBlur',
    },
  ]
}
