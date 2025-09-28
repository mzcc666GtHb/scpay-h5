<template>
  <div class="settings-card">
    <div
      v-for="setting in settingsItems"
      :key="setting.key"
      class="setting-item"
      @click="handleSettingClick(setting.key)"
    >
      <div class="setting-left">
        <div class="setting-icon">
          <img :src="setting.icon" :alt="setting.label" />
        </div>
        <span class="setting-label">{{ setting.label }}</span>
      </div>
      <div class="setting-arrow">
        <i class="i-material-symbols:chevron-right text-gray-400" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  interface SettingItem {
    key: string
    label: string
    icon: string
    route?: string
    action?: () => void
  }

  const settingsItems = ref<SettingItem[]>([
    {
      key: 'service',
      label: 'Service',
      icon: '/src/assets/images/mine-service.png',
      route: '/service',
    },
    {
      key: 'inbox',
      label: 'Inbox',
      icon: '/src/assets/images/mine-inbox.png',
      route: '/inbox',
    },
    {
      key: 'pin-code',
      label: 'Pin Code',
      icon: '/src/assets/images/mine-pincode.png',
      route: '/pin-code',
    },
    {
      key: 'log-out',
      label: 'Log Out',
      icon: '/src/assets/images/mine-login-out.png',
      action: () => {
        // 处理退出登录逻辑
        console.log('Log out clicked')
      },
    },
  ])

  const handleSettingClick = (key: string) => {
    const item = settingsItems.value.find((item) => item.key === key)
    if (item?.action) {
      item.action()
    } else if (item?.route) {
      // 这里可以添加路由跳转逻辑
      console.log(`Navigate to ${item.route}`)
    }
  }
</script>

<script lang="ts">
  export default {
    name: 'SettingsList',
  }
</script>

<style lang="less" scoped>
  .settings-card {
    background: white;
    border-radius: 16px;
    margin: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .setting-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    height: 58px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f8f9fa;
    }

    &:active {
      background-color: #e9ecef;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #f0f0f0;
    }
  }

  .setting-left {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .setting-icon {
    width: 30px;
    height: 30px;
    margin-right: 6px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 24px;
      height: 24px;
    }
  }

  .setting-label {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
  }

  .setting-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }
</style>
