<template>
  <van-form v-if="getShow" ref="formRef" class="flex flex-col pt-0" @submit="handleReset">
    <div class="enter-y mb-3 text-lg font-bold sm:mb-4 sm:text-xl">
      Reset Password
    </div>

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

    <!-- 新密码输入框 -->
    <van-field
      v-model="formData.password"
      class="enter-y mb-3 h-[48px] items-center sm:mb-4 sm:h-[50px] !border-0 !rounded-lg !bg-gray-100"
      :type="switchPassType ? 'password' : 'text'"
      name="password"
      maxlength="20"
      placeholder="Enter new password"
      :rules="getFormRules.password"
      @click-right-icon="switchPassType = !switchPassType"
    >
      <template #right-icon>
        <i v-if="switchPassType" class="i-mdi:eye-outline mr-2 text-base sm:text-lg" />
        <i v-else class="i-mdi:eye-off mr-2 text-base sm:text-lg" />
      </template>
    </van-field>

    <!-- 确认密码输入框 -->
    <van-field
      v-model="formData.confirmPassword"
      class="enter-y mb-4 h-[48px] items-center sm:mb-6 sm:h-[50px] !border-0 !rounded-lg !bg-gray-100"
      :type="switchConfirmPassType ? 'password' : 'text'"
      name="confirmPassword"
      maxlength="20"
      placeholder="Confirm new password"
      :rules="getFormRules.confirmPassword"
      @click-right-icon="switchConfirmPassType = !switchConfirmPassType"
    >
      <template #right-icon>
        <i v-if="switchConfirmPassType" class="i-mdi:eye-outline mr-2 text-base sm:text-lg" />
        <i v-else class="i-mdi:eye-off mr-2 text-base sm:text-lg" />
      </template>
    </van-field>

    <!-- 重置按钮 -->
    <van-button
      class="enter-y !mb-4 !h-[48px] !border-[#3367F0] !rounded-full !bg-[#3367F0] sm:!h-[50px]"
      type="primary"
      block
      native-type="submit"
      :loading="loading"
    >
      Reset Password
    </van-button>

    <!-- 返回按钮 -->
    <van-button
      class="enter-y !h-[48px] !border-gray-300 !rounded-full !bg-white !text-gray-600 sm:!h-[50px]"
      plain
      block
      @click="handleBackLogin"
    >
      Back to Login
    </van-button>
  </van-form>
</template>

<script setup lang="ts">
import type { FormInstance } from 'vant'
import { showFailToast, showSuccessToast } from 'vant'
import { LoginStateEnum, useFormRules, useLoginState } from './useLogin'
import { http } from '@/utils/http/axios'

const { handleBackLogin, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()
const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD)

const loading = ref(false)
const formRef = ref<FormInstance>()
const switchPassType = ref(true)
const switchConfirmPassType = ref(true)

const formData = reactive({
  mobile: '',
  sms: '',
  password: '',
  confirmPassword: '',
})

// 仅保留数字
const digitsOnly = (val: string) => val.replace(/\D+/g, '')

// OTP 发送与倒计时
const otpSending = ref(false)
const otpSeconds = ref(60)
let otpTimer: number | null = null
const otpBtnText = computed(() => (otpSending.value ? `${otpSeconds.value}s` : 'Send OTP'))

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
    // 先检查手机号是否已存在账号
    const exists = await http.request<boolean>({
      url: '/reset/checkMobile',
      method: 'GET',
      params: { countryCode: '91', mobile: formData.mobile },
    })
    if (!exists) {
      showFailToast('This mobile number does not have an account')
      return
    }
    // 发送 OTP
    await http.request({
      url: '/reset/sendOtp',
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


function handleReset() {
  formRef.value
    ?.validate()
    .then(async () => {
      try {
        loading.value = true
        // 检查密码是否一致
        if (formData.password !== formData.confirmPassword) {
          showFailToast('Passwords do not match')
          return
        }

        // 调用重置密码接口
        await http.request({
          url: '/reset/password',
          method: 'POST',
          data: {
            countryCode: '91',
            mobile: formData.mobile,
            sms: formData.sms,
            password: formData.password,
          },
        })

        showSuccessToast('Password reset successfully')
        handleBackLogin()
      }
      catch {
        // 失败信息在 axios 拦截器里已统一提示
      }
      finally {
        loading.value = false
      }
    })
    .catch(() => {
      console.error('验证失败')
    })
}
</script>

<style scoped lang="less"></style>
