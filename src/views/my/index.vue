<template>
  <div class="my-page">
    <!-- 用户信息头部 -->
    <UserHeader />

    <!-- 收益统计卡片 -->
    <EarningsCard />

    <!-- 我的订单 -->
    <MyOrders />

    <!-- 设置列表 -->
    <SettingsList />
  </div>
</template>

<script lang="ts" setup>
  import { defineAsyncComponent } from 'vue'

  const UserHeader = defineAsyncComponent(() => import('./components/UserHeader.vue'))
  const EarningsCard = defineAsyncComponent(() => import('./components/EarningsCard.vue'))
  const MyOrders = defineAsyncComponent(() => import('./components/MyOrders.vue'))
  const SettingsList = defineAsyncComponent(() => import('./components/SettingsList.vue'))
</script>

<style lang="less" scoped>
  .my-page {
    min-height: calc(100vh - 60px); /* 减去 tabbar 高度 */
    background: #f5f5f5;
    padding-bottom: 20px; /* 减少底部间距，因为主布局已经处理了 */
  }
</style>
