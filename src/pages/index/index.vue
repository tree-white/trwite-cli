<template>
  <view class="content">
    <uni-card title="Hello">
      <view style="margin-bottom: 20rpx">{{ title }}</view>
      <button type="primary">按钮</button>
    </uni-card>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('这是一张Uni-UI测试卡片')
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
