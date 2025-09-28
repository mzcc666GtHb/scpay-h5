<template>
  <div class="total-team-data">
    <h3 class="section-title">
      Total Teams Data
    </h3>
    <div class="data-cards">
      <div class="data-card">
        <h4 class="card-title">
          Team Commission
        </h4>
        <p class="card-value">
          {{ totalCommission }}
        </p>
      </div>
      <div class="data-card">
        <h4 class="card-title">
          Team Members
        </h4>
        <p class="card-value">
          {{ totalMembers }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
  name: 'TotalTeamData',
})

const totalCommission = ref('0')
const totalMembers = ref('0')
</script>

<style lang="less" scoped>
  .total-team-data {
  margin: 0 14px 20px;
}

.section-title {
  font-size: 17px;
  font-weight: 700;
  color: #333;
  margin: 0 0 14px 0;
}

.data-cards {
  display: flex;
  gap: 7px;
}

.data-card {
  flex: 1;
  background: white;
  border-radius: 20px;
  height: 93px;
  padding: 0;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .card-title {
    position: absolute;
    left: 14px;
    top: 16px;
    font-size: 14px;
    font-weight: 500;
    color: #666666;
    margin: 0;
  }

  .card-value {
    position: absolute;
    left: 14px;
    top: 38px; /* 16px + 14px + 8px */
    height: 33px;
    font-size: 24px;
    font-weight: 700;
    color: #333333;
    margin: 0;
    line-height: 33px;
  }
}
</style>
