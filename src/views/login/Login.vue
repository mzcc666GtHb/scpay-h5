<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- 头部背景图区域 -->
    <div
      class="relative h-[200px] w-full from-blue-50 to-blue-100 bg-gradient-to-br sm:h-[272.5px]"
    >
      <img
        src="/login_bg.png"
        alt="Login Background"
        class="absolute right-0 top-0 h-full w-full object-cover opacity-80"
      >
      <!-- 欢迎文字 -->
      <div class="absolute left-4 top-12 z-10 sm:left-5 sm:top-16">
        <div class="mb-1 text-2xl text-gray-800 font-bold sm:mb-2 sm:text-4xl">
          HI~
        </div>
        <div class="mb-2 text-lg text-gray-800 font-bold sm:mb-4 sm:text-2xl">
          Welcome to SCpay
        </div>
        <div class="flex items-center text-sm text-gray-600 sm:text-base">
          <i class="i-ph:arrow-circle-right mr-1 sm:mr-2" />
          <span>Login Account</span>
        </div>
      </div>
    </div>

    <!-- 登录表单区域 -->
    <div class="flex-1 px-4 pt-2 sm:px-5 sm:pt-0">
      <LoginForm />
      <ForgetPasswordForm />
      <RegisterForm />
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件会自动注册，无需显式导入
</script>

<style scoped lang="less">
  :deep(.van-field__left-icon) {
  display: flex;
}
:deep(.van-field__right-icon) {
  display: flex;
}

/* 移动端优化 */
@media (max-width: 640px) {
  :deep(.van-field) {
    font-size: 16px; /* 防止iOS缩放 */
  }

  :deep(.van-button) {
    font-size: 14px;
  }

  :deep(.van-checkbox) {
    font-size: 12px;
  }
}

/* 触摸优化 */
:deep(.van-field__control) {
  -webkit-tap-highlight-color: transparent;
}

:deep(.van-button) {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
</style>
