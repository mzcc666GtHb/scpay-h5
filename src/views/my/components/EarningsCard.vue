<template>
  <div class="earnings-card">
    <div class="earnings-content">
      <div class="earnings-item">
        <div class="amount">$1,890</div>
        <div class="label">Today's Earn</div>
      </div>
      <div class="divider"></div>
      <div class="earnings-item">
        <div class="amount">$15,901</div>
        <div class="label">Total's Earn</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  // 这里可以添加收益数据的 props 或从 store 获取
  interface Props {
    todayEarn?: number
    totalEarn?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    todayEarn: 1890,
    totalEarn: 15901,
  })
</script>

<script lang="ts">
  export default {
    name: 'EarningsCard',
  }
</script>

<style lang="less" scoped>
  .earnings-card {
    background: #3367f0;
    border-radius: 16px;
    margin: 0 15px;
    margin-top: -52px; /* 负边距让卡片向上移动，部分覆盖 header */
    height: 104px;
    box-shadow: 0 8px 24px rgba(51, 103, 240, 0.3);
    overflow: hidden;
    position: relative;
    z-index: 10;
  }

  .earnings-content {
    display: flex;
    align-items: center;
    padding: 16px 20px;
    position: relative;
    height: 100%;
  }

  .earnings-item {
    flex: 1;
    text-align: center;
    color: white;

    .amount {
      font-size: 24px;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 2px;
    }

    .label {
      font-size: 12px;
      font-weight: 400;
      opacity: 0.9;
    }
  }

  .divider {
    width: 1px;
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 0 20px;
  }
</style>
