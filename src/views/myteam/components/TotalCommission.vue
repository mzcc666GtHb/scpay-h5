<template>
  <div class="total-commission">
    <div class="commission-info">
      <div class="commission-text">
        <p class="label">My total Commission</p>
        <p class="amount">
          {{ totalCommission }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  defineOptions({
    name: 'TotalCommission',
  })

  const totalCommission = ref('10.0')
</script>

<style lang="less" scoped>
  .page-title {
    position: absolute;
    top: 54px;
    left: 0;
    right: 0;
    text-align: center;

    h1 {
      font-size: 24px;
      font-weight: 700;
      color: #333;
      margin: 0;
    }
  }

  .total-commission {
    background: linear-gradient(119deg, #cdf0ff 0%, #fffef5 41%, #e4ecff 100%);
    margin: 0;
    border-radius: 0 0 32px 32px;
    padding: 0;
    position: relative;
    overflow: hidden;
    height: 406px;
  }

  .commission-info {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .commission-text {
    position: absolute;
    left: 24px;
    top: 120px;

    .label {
      color: #999999;
      font-size: 14px;
      margin: 0 0 0 0;
      font-weight: 400;
    }

    .amount {
      color: #333;
      font-size: 40px;
      font-weight: 700;
      margin: 0;
      line-height: 1.2;
    }
  }
</style>
