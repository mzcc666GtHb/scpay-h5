<template>
  <van-form v-if="getShow" ref="formRef" class="flex flex-col" @submit="handleRegister">
    <div class="enter-y mb-4 text-xl font-bold">
      Create Account
    </div>
    <van-cell-group inset class="enter-y !mx-0 !mb-10">
      <!-- Mobile (+91) -->
      <van-field
        v-model="formData.mobile"
        class="enter-y items-center !rounded-md"
        name="mobile"
        type="tel"
        maxlength="10"
        placeholder="Enter mobile number"
        :formatter="digitsOnly"
        format-trigger="onChange"
        :rules="getFormRules.mobile"
      >
        <template #left-icon>
          <span class="mr-2 text-lg">+91</span>
        </template>
      </van-field>

      <!-- Password -->
      <van-field
        v-model="formData.password"
        class="enter-y items-center !rounded-md"
        :type="switchPassType ? 'password' : 'text'"
        name="password"
        maxlength="20"
        placeholder="Enter password"
        :rules="getFormRules.password"
        @click-right-icon="switchPassType = !switchPassType"
      >
        <template #left-icon>
          <i class="i-iconamoon:lock-bold mr-2 text-lg" />
        </template>
        <template #right-icon>
          <i v-if="switchPassType" class="i-mdi:eye-outline mr-2 text-lg" />
          <i v-else class="i-mdi:eye-off mr-2 text-lg" />
        </template>
      </van-field>

      <!-- Confirm Password -->
      <van-field
        v-model="formData.confirmPassword"
        class="enter-y items-center !rounded-md"
        :type="switchConfirmPassType ? 'password' : 'text'"
        name="confirmPassword"
        maxlength="20"
        placeholder="Enter confirm password"
        :rules="getFormRules.confirmPassword"
        @click-right-icon="switchConfirmPassType = !switchConfirmPassType"
      >
        <template #left-icon>
          <i class="i-iconamoon:lock-bold mr-2 text-lg" />
        </template>
        <template #right-icon>
          <i v-if="switchConfirmPassType" class="i-mdi:eye-outline mr-2 text-lg" />
          <i v-else class="i-mdi:eye-off mr-2 text-lg" />
        </template>
      </van-field>

      <!-- OTP -->
      <van-field
        v-model="formData.sms"
        class="enter-y items-center !rounded-md"
        center
        clearable
        name="sms"
        placeholder="Enter the otp code"
        :rules="getFormRules.sms"
      >
        <template #left-icon>
          <i class="i-material-symbols:edit-square-outline-rounded mr-2 text-lg" />
        </template>
        <template #button>
          <van-button
            size="small"
            type="primary"
            :disabled="otpSending"
            @click="handleSendOtp"
          >
            {{ otpBtnText }}
          </van-button>
        </template>
      </van-field>

      <!-- Invitation Code -->
      <van-field
        v-model="formData.inviteCode"
        class="enter-y items-center !rounded-md"
        name="inviteCode"
        placeholder="Invitation code"
      />
    </van-cell-group>

    <van-button
      class="enter-y !mb-4 !rounded-md"
      type="primary"
      block
      native-type="submit"
      :loading="loading"
    >
      Sign Up
    </van-button>

    <div class="enter-y mt-2 text-center text-gray-600">
      Already have an account?
      <a class="text-blue-500" @click="handleBackLogin">Log in</a>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import type { FormInstance } from 'vant'
import { showFailToast, showSuccessToast } from 'vant'
import { http } from '@/utils/http/axios'

import { LoginStateEnum, useFormRules, useLoginState } from './useLogin'

const { handleBackLogin, getLoginState } = useLoginState()
const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

const loading = ref(false)
const formRef = ref<FormInstance>()

const formData = reactive({
  mobile: '',
  sms: '',
  password: '',
  confirmPassword: '',
  inviteCode: '',
})

const { getFormRules } = useFormRules(formData)

const switchPassType = ref(true)
const switchConfirmPassType = ref(true)

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
  otpTimer && clearInterval(otpTimer)
  otpTimer = window.setInterval(() => {
    otpSeconds.value -= 1
    if (otpSeconds.value <= 0) {
      otpSending.value = false
      otpTimer && clearInterval(otpTimer)
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
    // 先检查手机号是否已存在
    const exists = await http.request<boolean>({
      url: '/register/checkMobile',
      method: 'GET',
      params: { countryCode: '91', mobile: formData.mobile },
    })
    if (exists) {
      showFailToast('This mobile number already has an account')
      return
    }
    // 发送 OTP
    await http.request({
      url: '/register/sendOtp',
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

function handleRegister() {
  formRef.value
    ?.validate()
    .then(async () => {
      try {
        loading.value = true
        // do something

        console.log('%c [  ]-167', 'font-size:13px; background:pink; color:#bf2c9f;')
      }
      finally {
        loading.value = false

        console.log('%c [  ]-171', 'font-size:13px; background:pink; color:#bf2c9f;')
      }
    })
    .catch(() => {
      console.error('验证失败')
    })
}
</script>

<style scoped lang="less"></style>
