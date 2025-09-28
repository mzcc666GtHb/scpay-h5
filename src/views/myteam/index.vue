<template>
  <div class="myteam-page">
    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="time">
        9:41
      </div>
      <div class="status-icons">
        <i class="i-material-symbols:signal-cellular-4-bar text-sm text-white" />
        <i class="i-material-symbols:wifi ml-1 text-sm text-white" />
        <i class="i-material-symbols:battery-6-bar ml-1 text-sm text-white" />
      </div>
    </div>

    <!-- 页面标题 -->
    <div class="page-title">
      <h1>My Team</h1>
    </div>

    <!-- 我的总佣金 -->
    <TotalCommission />

    <!-- 今日团队数据 -->
    <TodayTeamData />

    <!-- 总团队数据 -->
    <TotalTeamData />

    <!-- 邀请链接 -->
    <InvitationLink />

    <!-- 更多邀请方式 -->
    <MoreWaysInvite />
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

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 10px;

  .time {
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }

  .status-icons {
    display: flex;
    align-items: center;
  }
}

.page-title {
  text-align: center;
  padding: 0 16px 20px;

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: #333;
    margin: 0;
  }
}
</style>
