<template>
  <div class="message-page">
    <div class="header">
      <van-tabs v-model:active="topTab" class="top-tabs">
        <van-tab title="INR" name="INR"></van-tab>
        <van-tab title="USDT" name="USDT"></van-tab>
      </van-tabs>
    </div>

    <div class="content-card">
      <van-tabs v-model:active="currentStatus" class="status-tabs">
        <van-tab title="All" name="all"></van-tab>
        <van-tab title="Paying" name="paying"></van-tab>
        <van-tab title="Checking" name="checking"></van-tab>
        <van-tab title="Success" name="success"></van-tab>
        <van-tab title="Fail" name="fail"></van-tab>
      </van-tabs>

      <div class="content-wrap">
        <div class="content-box">
          <van-empty description="No data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 页面名称，便于 keep-alive 和路由 name 对齐
  defineOptions({ name: 'Message' })

  const topTab = ref<'INR' | 'USDT'>('INR')

  type Status = 'all' | 'paying' | 'checking' | 'success' | 'fail'
  // 不同顶层Tab拥有各自的状态选择
  const statusByTop = reactive<Record<'INR' | 'USDT', Status>>({ INR: 'all', USDT: 'all' })
  // 计算属性用于二级Tabs的双向绑定
  const currentStatus = computed<Status>({
    get() {
      return statusByTop[topTab.value]
    },
    set(val) {
      statusByTop[topTab.value] = val
    },
  })

  // 如需对接接口：监听二者变化进行请求
  // watch([topTab, currentStatus], () => {
  //   fetchRecords(topTab.value, currentStatus.value)
  // })
</script>

<style lang="less" scoped>
  .message-page {
    min-height: calc(100vh - 48px);
    background: linear-gradient(126deg, #3367f0 0%, #4184ff 48%, #3367f0 100%);

    .header {
      padding: 80px 8px 10px;
      text-align: center;

      .title {
        color: white;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 28px;
        letter-spacing: 0.3px;
      }

      .top-tabs {
        :deep(.van-tabs__wrap) {
          background: transparent;
          border: none;
        }

        :deep(.van-tabs__nav) {
          background: transparent;
          border: none;
        }

        :deep(.van-tab) {
          color: rgba(255, 255, 255, 0.75);
          font-size: 20px;
          font-weight: 500;
          padding: 0 20px;

          &.van-tab--active {
            color: white;
            font-weight: 600;
          }
        }

        :deep(.van-tabs__line) {
          background: white;
          height: 4px;
          border-radius: 10px;
          width: 30px !important;
        }
      }
    }

    .content-card {
      background: rgba(243, 245, 247, 0.8);
      border-radius: 20px 20px 0 0;
      margin-top: 0;
      min-height: calc(100vh - 136px);
      padding: 0;
      position: relative;
      box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.06);

      .status-tabs {
        padding: 14px 14px 0;

        :deep(.van-tabs__wrap) {
          background: rgba(234, 239, 255, 0.64);
          border-radius: 999px;
          padding: 3px;
          margin-bottom: 0;
          height: 36px;
        }

        :deep(.van-tabs__nav) {
          background: transparent;
          border: none;
          padding: 0;
        }

        :deep(.van-tab) {
          color: #8391a5;
          font-size: 13px;
          font-weight: 500;
          padding: 7px 14px;
          margin: 0 1px;
          border-radius: 999px;
          transition: all 0.25s ease;
          min-width: auto;
          flex: 1;

          &.van-tab--active {
            color: #4f7cff;
            font-weight: 600;
            background: white;
            border: 1px solid rgba(79, 124, 255, 0.08);
            box-shadow: 0 1px 6px rgba(79, 124, 255, 0.12);
          }

          &:hover:not(.van-tab--active) {
            background: rgba(255, 255, 255, 0.4);
          }
        }

        :deep(.van-tabs__line) {
          display: none;
        }
      }

      .content-wrap {
        padding: 14px;
        :deep(.van-empty) {
          padding-top: 70px;
          .van-empty__image {
            width: 100px;
            height: 100px;
          }

          .van-empty__description {
            color: #bbbbc6;
            font-size: 14px;
            margin-top: 12px;
          }
        }
        .content-box {
          min-height: 500px;
          padding: 14px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
        }
      }
    }
  }
</style>
