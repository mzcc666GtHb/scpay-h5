<template>
  <van-form v-if="getShow" ref="formRef" class="flex flex-col pt-0" @submit="handleSubmit">
    <!-- 手机号输入框 -->
    <van-field
      v-model="formData.mobile"
      class="enter-y mb-3 h-[48px] items-center sm:mb-4 sm:h-[50px] !border-0 !rounded-lg !bg-gray-100"
      name="mobile"
      type="tel"
      maxlength="10"
      placeholder="Enter mobile number"
      :formatter="digitsOnly"
      format-trigger="onChange"
      :rules="getFormRules.mobile"
    >
      <template #left-icon>
        <div class="mr-2 flex items-center">
          <span class="mr-1 text-base sm:text-lg">🇮🇳</span>
          <span class="text-xs font-medium sm:text-sm">+91</span>
          <i class="i-ph:caret-down ml-1 text-xs" />
        </div>
      </template>
    </van-field>

    <!-- OTP输入框和按钮 -->
    <div class="enter-y mb-3 flex gap-2 sm:mb-4">
      <van-field
        v-model="formData.sms"
        class="h-[48px] flex-1 items-center sm:h-[50px] !border-0 !rounded-lg !bg-gray-100"
        center
        clearable
        name="sms"
        placeholder="Enter the otp code"
        :rules="getFormRules.sms"
      />
      <van-button
        type="primary"
        class="!h-[48px] !w-[90px] !border-[#3367F0] !rounded-lg !bg-[#3367F0] !text-xs sm:!h-[50px] sm:!w-[100px] sm:!text-sm"
        :disabled="otpSending"
        @click="handleSendOtp"
      >
        {{ otpBtnText }}
      </van-button>
    </div>

    <!-- 密码输入框 -->
    <van-field
      v-model="formData.password"
      class="enter-y mb-2 h-[48px] items-center sm:h-[50px] !border-0 !rounded-lg !bg-gray-100"
      :type="switchPassType ? 'password' : 'text'"
      name="password"
      maxlength="20"
      placeholder="Enter password"
      :rules="getFormRules.password"
      @click-right-icon="switchPassType = !switchPassType"
    >
      <template #right-icon>
        <i v-if="switchPassType" class="i-mdi:eye-outline mr-2 text-base sm:text-lg" />
        <i v-else class="i-mdi:eye-off mr-2 text-base sm:text-lg" />
      </template>
    </van-field>

    <!-- 忘记密码链接 -->
    <div class="mb-4 flex justify-end sm:mb-6">
      <a
        class="text-xs text-blue-500 sm:text-sm"
        @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
      >
        Forget password
      </a>
    </div>

    <!-- 协议checkbox -->
    <div class="mb-4 flex items-start sm:mb-6">
      <van-checkbox v-model="agreePolicy" class="mr-2 mt-0.5">
        <template #icon="props">
          <div
            class="h-3 w-3 flex items-center justify-center border-2 rounded sm:h-4 sm:w-4"
            :class="props.checked ? 'bg-[#3367F0] border-[#3367F0]' : 'border-gray-300'"
          >
            <i v-if="props.checked" class="i-ph:check text-xs text-white" />
          </div>
        </template>
      </van-checkbox>
      <span class="text-xs text-gray-600 sm:text-sm">
        I agree User
        <span class="cursor-pointer text-[#3367F0]" @click="showPrivacyAgreement">Privacy Agreement</span>
      </span>
    </div>

    <!-- 登录按钮 -->
    <van-button
      class="enter-y !mb-4 !h-[48px] !border-[#3367F0] !rounded-full !bg-[#3367F0] sm:!mb-6 sm:!h-[50px]"
      type="primary"
      block
      native-type="submit"
      :loading="loading"
      :disabled="!agreePolicy"
    >
      Login
    </van-button>

    <!-- 注册链接 -->
    <div class="text-center text-xs text-gray-600 sm:text-sm">
      Don't have an account?
      <span
        class="cursor-pointer text-gray-800 font-medium"
        @click="setLoginState(LoginStateEnum.REGISTER)"
      >
        Create an account
      </span>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import type { FormInstance } from 'vant'
import { LoginStateEnum, useFormRules, useLoginState } from './useLogin'
import { useUserStore } from '@/store/modules/user'
import { ResultEnum } from '@/enums/httpEnum'
import { PageEnum } from '@/enums/pageEnum'
import { http } from '@/utils/http/axios'

const { setLoginState, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const formRef = ref<FormInstance>()
const loading = ref(false)
const switchPassType = ref(true)
const agreePolicy = ref(true) // 默认同意隐私协议
const formData = reactive({
  mobile: '',
  sms: '',
  password: '',
})

// OTP 发送与倒计时
const otpSending = ref(false)
const otpSeconds = ref(60)
let otpTimer: number | null = null
const otpBtnText = computed(() => (otpSending.value ? `${otpSeconds.value}s` : 'Send OTP'))

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

// 仅保留数字
const digitsOnly = (val: string) => val.replace(/\D+/g, '')

function startOtpCountdown() {
  otpSending.value = true
  otpSeconds.value = 60
  if (otpTimer) {
    clearInterval(otpTimer)
  }
  otpTimer = window.setInterval(() => {
    otpSeconds.value -= 1
    if (otpSeconds.value <= 0) {
      otpSending.value = false
      if (otpTimer) {
        clearInterval(otpTimer)
      }
      otpTimer = null
    }
  }, 1000)
}

async function handleSendOtp() {
  if (!/^\d{1,10}$/.test(formData.mobile)) {
    showFailToast('Please enter valid mobile number (up to 10 digits)')
    return
  }
  try {
    // 发送 OTP
    await http.request({
      url: '/login/sendOtp',
      method: 'POST',
      params: { countryCode: '91', mobile: formData.mobile },
    })
    showSuccessToast('OTP sent')
    startOtpCountdown()
  }
  catch {
    // 失败信息在 axios 拦截器里已统一提示
  }
}

function showPrivacyAgreement() {
  // 显示隐私协议详情
  showSuccessToast('隐私协议详情功能待实现')
  // TODO: 实现隐私协议详情页面或弹窗
}

function handleSubmit() {
  // 检查隐私协议是否同意
  if (!agreePolicy.value) {
    showFailToast('请先同意隐私协议')
    return
  }

  formRef.value
    ?.validate()
    .then(async () => {
      try {
        loading.value = true
        showLoadingToast('登录中...')
        const { code, message: msg } = await userStore.Login({
          username: formData.mobile,
          password: formData.password,
        })
        if (code === ResultEnum.SUCCESS) {
          const toPath = decodeURIComponent((route.query?.redirect || '/') as string)
          showSuccessToast('登录成功，即将进入系统')
          if (route.name === PageEnum.BASE_LOGIN_NAME) {
            router.replace('/')
          }
          else {
            router.replace(toPath)
          }
        }
        else {
          showFailToast(msg || '登录失败')
        }
      }
      finally {
        loading.value = false
      }
    })
    .catch(() => {
      console.error('验证失败')
    })
}

onMounted(() => {})
</script>

<style scoped lang="less">
  :deep(.van-form) {
  padding-top: 0 !important;
}
</style>
