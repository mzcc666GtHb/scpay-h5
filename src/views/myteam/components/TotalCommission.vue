<template>
  <div class="total-commission">
    <div class="commission-info">
      <div class="commission-text">
        <p class="label">
          My total Commission
        </p>
        <p class="amount">
          {{ totalCommission }}
        </p>
      </div>
      <div class="wallet-graphic">
        <div class="wallet">
          <div class="wallet-body" />
          <div class="papers">
            <div class="paper paper-1" />
            <div class="paper paper-2" />
            <div class="paper paper-3" />
          </div>
          <div class="coin">
            $
          </div>
        </div>
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
.total-commission {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  margin: 0 16px 20px;
  border-radius: 16px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.commission-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.commission-text {
  .label {
    color: #666;
    font-size: 14px;
    margin: 0 0 8px 0;
    font-weight: 400;
  }

  .amount {
    color: #333;
    font-size: 32px;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
  }
}

.wallet-graphic {
  position: relative;
  width: 80px;
  height: 60px;
}

.wallet {
  position: relative;
  width: 100%;
  height: 100%;
}

.wallet-body {
  width: 60px;
  height: 40px;
  background: #3367f0;
  border-radius: 8px;
  position: absolute;
  bottom: 0;
  left: 10px;
}

.papers {
  position: absolute;
  top: 0;
  left: 15px;
  width: 50px;
  height: 30px;
}

.paper {
  position: absolute;
  background: white;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &.paper-1 {
    width: 30px;
    height: 20px;
    top: 0;
    left: 0;
    z-index: 3;
  }

  &.paper-2 {
    width: 28px;
    height: 18px;
    top: 2px;
    left: 2px;
    z-index: 2;
  }

  &.paper-3 {
    width: 26px;
    height: 16px;
    top: 4px;
    left: 4px;
    z-index: 1;
  }
}

.coin {
  position: absolute;
  top: 15px;
  right: 5px;
  width: 20px;
  height: 20px;
  background: #ffd700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #333;
  z-index: 4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
