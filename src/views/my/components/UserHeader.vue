<template>
  <div class="user-header">
    <!-- 用户信息区域 -->
    <div class="user-info-section">
      <div class="user-profile">
        <van-image class="avatar" round fit="cover" :src="avatar" />
        <div class="user-details">
          <h2 class="username">{{ nickname || 'Matilda Evans' }}</h2>
          <p class="uid">UID: {{ userId || '103069' }}</p>
        </div>
      </div>

      <!-- 装饰性金币图标 -->
      <div class="decorative-coins">
        <img src="@/assets/images/coin.png" alt="coins" class="coin-stack" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user'

  const userStore = useUserStore()
  const { nickname, avatar, userId } = userStore.getUserInfo
</script>

<script lang="ts">
  export default {
    name: 'UserHeader',
  }
</script>

<style lang="less" scoped>
  .user-header {
    background-image: url('@/assets/images/mine-head-bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 262px;
    padding: 20px 16px 24px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .time {
      color: white;
      font-size: 16px;
      font-weight: 600;
    }

    .status-icons {
      display: flex;
      align-items: center;
    }
  }

  .user-info-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .user-profile {
    display: flex;
    align-items: center;
    flex: 1;
    margin: 0 16px;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border: 4px solid white;
    margin-right: 16px;
  }

  .user-details {
    .username {
      color: #101010;
      font-size: 22px;
      font-weight: 700;
      margin: 0 0 4px 0;
      line-height: 1.2;
    }

    .uid {
      color: #666666;
      font-size: 14px;
      margin: 0;
      font-weight: 400;
    }
  }

  .decorative-coins {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);

    .coin-stack {
      width: 40px;
      height: 40px;
      opacity: 0.7;
    }
  }
</style>
