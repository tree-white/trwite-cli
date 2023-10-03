<template>
  <view class="content">
    <uni-card title="Hello">
      <view style="margin-bottom: 20rpx">{{ title }} {{ demoStore.count }}</view>
      <view style="display: flex; gap: 20rpx">
        <button type="primary" @tap="demoStore.add">加</button>
        <button type="warn" @tap="demoStore.sub">减</button>
      </view>
    </uni-card>
  </view>
</template>

<script setup lang="ts">
import { useDemoStore } from '@/stores'
import { ref } from 'vue'
const title = ref('Demo数字：')
const demoStore = useDemoStore()
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
