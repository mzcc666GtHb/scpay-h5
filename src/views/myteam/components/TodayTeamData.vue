<template>
  <div class="today-team-data">
    <h3 class="section-title">
      Today Teams Data
    </h3>
    <div class="data-cards">
      <div class="data-card">
        <h4 class="card-title">
          Team Commission
        </h4>
        <p class="card-value">
          {{ todayCommission }}
        </p>
      </div>
      <div class="data-card">
        <h4 class="card-title">
          Team Members
        </h4>
        <p class="card-value">
          {{ todayMembers }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
  name: 'TodayTeamData',
})

const todayCommission = ref('0')
const todayMembers = ref('0')
</script>

<style lang="less" scoped>
.today-team-data {
  margin: 0 16px 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin: 0 0 16px 0;
}

.data-cards {
  display: flex;
  gap: 12px;
}

.data-card {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .card-title {
    font-size: 14px;
    font-weight: 500;
    color: #666;
    margin: 0 0 8px 0;
  }

  .card-value {
    font-size: 24px;
    font-weight: 700;
    color: #333;
    margin: 0;
    line-height: 1.2;
  }
}
</style>
