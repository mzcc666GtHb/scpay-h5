<template>
  <div class="min-h-screen bg-[#f7f8fa] pb-40">
    <!-- 顶部 Banner 背景图 -->
    <div class="relative h-[210px] bg-cover bg-center" :style="{ backgroundImage: `url(${banner})` }" />

    <!-- 余额卡片 -->
    <div class="relative mb-2 rounded-t-2xl bg-white p-4 -mt-6">
      <div class="flex items-center justify-between text-sm text-gray-500">
        <span> <span class="color-[#333333]">My Balance</span> (UID:003391)</span>
      </div>
      <div class="mt-3 flex items-center">
        <img class="mr-3 h-6 w-6" src="../../assets/images/coin.png" alt="coin">
        <div class="mr-2 text-3xl font-800">
          50.00
        </div>
        <van-icon name="eye-o" />
      </div>
      <div
        class="mt-3 h-[44px] flex items-center justify-between rounded-xl bg-[linear-gradient(127deg,_#3367F0_0%,_#4184FF_71%,_#3367F0_99%)] px-3 text-white"
      >
        <div class="flex items-center text-white/90">
          <span class="mr-3">In Sell UOI Count:</span> <span
            class="text-[22px] font-700"
          >0</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-white/80">More></span>
        </div>
      </div>
      <!-- 功能按钮 -->
      <div class="grid grid-cols-3 mt-4 gap-4 px-3">
        <div class="flex flex-col items-center">
          <div
            class="h-[56px] w-[56px] flex items-center justify-center rounded-2xl from-[#a7d6ff] to-[#4f8dff] bg-gradient-to-b shadow"
          >
            <img src="../../assets/images/buy.png" alt="buy">
          </div>
          <div class="mt-2 text-gray-700">
            Buy
          </div>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="h-[56px] w-[56px] flex items-center justify-center rounded-2xl from-[#a8ffe0] to-[#4ecdc4] bg-gradient-to-b shadow"
          >
            <img src="../../assets/images/shell.png" alt="sell">
          </div>
          <div class="mt-2 text-gray-700">
            Sell
          </div>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="h-[56px] w-[56px] flex items-center justify-center rounded-2xl from-[#ffd2b8] to-[#ff8866] bg-gradient-to-b shadow"
          >
            <img src="../../assets/images/upi.png" alt="upi">
          </div>
          <div class="mt-2 text-gray-700">
            UPI
          </div>
        </div>
      </div>
    </div>

    <!-- Deposit with USDT -->
    <div class="bg-white px-3 pb-4 pt-5">
      <div class="mb-3 text-base text-gray-800 font-600">
        Deposit with USDT
      </div>
      <div class="relative flex gap-3">
        <div class="flex flex-1 flex-col items-center rounded-[10px] bg-[linear-gradient(0deg,_#FDF1E9_0%,_#FBCD9D_100%)] p-4 shadow-sm">
          <div class="relative">
            <div class="relative mr-1 text-2xl text-[#855534] font-800">
              93.83 <div class="absolute top-3 rounded-full bg-[#F35F67] px-1 text-[8px] text-[#fff] leading-normal -right-10">
                ↑34%
              </div>
            </div>
          </div>
          <div class="mt-1 text-sm text-gray-600">
            Market price
          </div>
        </div>
        <div class="flex flex-1 flex-col items-center rounded-xl bg-[linear-gradient(0deg,_#71A2FC_0%,_#3368F0_100%)] p-4 text-white shadow-sm">
          <div class="text-2xl font-800">
            96
          </div>
          <div class="mt-1 text-sm">
            Our price
          </div>
        </div>
        <div
          class="absolute left-1/2 top-1/2 h-8 w-8 flex items-center justify-center rounded-full bg-white text-[#5b67ff] font-700 shadow -translate-x-1/2 -translate-y-1/2"
        >
          VS
        </div>
      </div>
    </div>

    <!-- 今日买入 -->
    <div class="bg-[#f2f4f6] py-3 pt-6">
      <div class="px-3 text-gray-800 font-600">
        Today’s Buy
      </div>
      <div class="mt-3 flex gap-3 px-3">
        <div class="flex flex-1 items-center rounded-xl bg-white py-3 pl-3 shadow-sm">
          <img class="mr-2 h-8 w-8" src="../../assets/images/cash.png" alt="cash">
          <div>
            <div class="text-lg font-700">
              0
            </div>
            <div class="text-xs text-gray-500">
              IN Transaction
            </div>
          </div>
        </div>
        <div class="flex flex-1 items-center rounded-xl bg-white py-3 pl-3 shadow-sm">
          <img class="mr-2 h-8 w-8" src="../../assets/images/dollar.png" alt="dollar">
          <div>
            <div class="text-lg font-700">
              0.00
            </div>
            <div class="whitespace-nowrap text-xs text-gray-500">
              Transaction Success
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 今日卖出 -->
    <div class="bg-[#f2f4f6] py-3">
      <div class="px-3 text-gray-800 font-600">
        Today’s Sell
      </div>
      <div class="mt-3 flex gap-3 px-3">
        <div class="flex flex-1 items-center rounded-xl bg-white py-3 pl-3 shadow-sm">
          <img class="mr-2 h-8 w-8" src="../../assets/images/cash.png" alt="cash">
          <div>
            <div class="text-lg font-700">
              0.00
            </div>
            <div class="text-xs text-gray-500">
              IN Transaction
            </div>
          </div>
        </div>
        <div class="flex flex-1 items-center rounded-xl bg-white py-3 pl-3 shadow-sm">
          <img class="mr-2 h-8 w-8" src="../../assets/images/dollar.png" alt="dollar">
          <div>
            <div class="text-lg font-700">
              0
            </div>
            <div class="whitespace-nowrap text-xs text-gray-500">
              Transaction Success
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import banner from '@/assets/images/banner.png'

defineOptions({
  name: 'DashboardPage',
})
</script>

<style scoped lang="less"></style>
