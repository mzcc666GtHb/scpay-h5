<template>
  <div class="myteam-page">
    <!-- 我的总佣金 -->
    <TotalCommission />

    <!-- 内容容器 -->
    <div class="content-container">
      <!-- 今日团队数据 -->
      <TodayTeamData />

      <!-- 总团队数据 -->
      <TotalTeamData />

      <!-- 邀请链接 -->
      <InvitationLink />

      <!-- 更多邀请方式 -->
      <MoreWaysInvite />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const TotalCommission = defineAsyncComponent(() => import('./components/TotalCommission.vue'))
const TodayTeamData = defineAsyncComponent(() => import('./components/TodayTeamData.vue'))
const TotalTeamData = defineAsyncComponent(() => import('./components/TotalTeamData.vue'))
const InvitationLink = defineAsyncComponent(() => import('./components/InvitationLink.vue'))
const MoreWaysInvite = defineAsyncComponent(() => import('./components/MoreWaysInvite.vue'))
</script>

<style lang="less" scoped>
  .myteam-page {
  min-height: calc(100vh - 60px);
  background: #f5f5f5;
  padding-bottom: 20px;
}

.content-container {
  background: rgba(243, 245, 247, 0.7);
  box-shadow: inset 0px 4px 10px 0px rgba(255, 255, 255, 0.5);
  border-radius: 32px 32px 0px 0px;
  border: 1px solid;
  border-image: linear-gradient(180deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0)) 1 1;
  backdrop-filter: blur(10px);
  margin-top: -200px;
  padding: 0 0 20px 0;
  position: relative;
  z-index: 10;
}
</style>
