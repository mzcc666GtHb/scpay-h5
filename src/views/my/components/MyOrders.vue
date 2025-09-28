<template>
  <div class="my-orders-card">
    <div class="card-header">
      <h3 class="title">My Orders</h3>
    </div>

    <div class="orders-grid">
      <div
        v-for="order in orderItems"
        :key="order.key"
        class="order-item"
        @click="handleOrderClick(order.key)"
      >
        <div class="order-icon" :class="order.iconClass">
          <img :src="order.icon" :alt="order.label" />
        </div>
        <span class="order-label">{{ order.label }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  interface OrderItem {
    key: string
    label: string
    icon: string
    iconClass: string
    route?: string
  }

  const orderItems = ref<OrderItem[]>([
    {
      key: 'earn-record',
      label: 'Earn Record',
      icon: '/src/assets/images/mine-earn-record.png',
      iconClass: 'earn-record',
      route: '/earn-record',
    },
    {
      key: 'buy-order',
      label: 'Buy Order',
      icon: '/src/assets/images/mine-buy-order.png',
      iconClass: 'buy-order',
      route: '/buy-order',
    },
    {
      key: 'sell-order',
      label: 'Sell Order',
      icon: '/src/assets/images/mine-sell-order.png',
      iconClass: 'sell-order',
      route: '/sell-order',
    },
  ])

  const handleOrderClick = (key: string) => {
    const item = orderItems.value.find((item) => item.key === key)
    if (item?.route) {
      // 这里可以添加路由跳转逻辑
      console.log(`Navigate to ${item.route}`)
    }
  }
</script>

<script lang="ts">
  export default {
    name: 'MyOrders',
  }
</script>

<style lang="less" scoped>
  .my-orders-card {
    background: white;
    border-radius: 16px;
    margin: 16px;
    padding: 20px;
    height: 140px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    margin-bottom: 12px;

    .title {
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin: 0;
    }
  }

  .orders-grid {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .order-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .order-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3px;

    img {
      width: 24px;
      height: 24px;
    }

    &.earn-record {
      background: linear-gradient(135deg, #ff6b6b, #ee5a52);
    }

    &.buy-order {
      background: linear-gradient(135deg, #4ecdc4, #44a08d);
    }

    &.sell-order {
      background: linear-gradient(135deg, #74b9ff, #0984e3);
    }
  }

  .order-label {
    font-size: 12px;
    font-weight: 500;
    color: #666;
    text-align: center;
  }
</style>
