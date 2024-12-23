<template>
  <view class="detail-container">
    <!-- 功能入口列表 -->
    <view class="function-list">
      <!-- 病历书写 -->
      <view class="function-item" hover-class="item-hover" @click="goToMedicalRecord">
        <view class="icon-wrapper medical">
          <img src="../../static/icons/medical-record.png" alt="病历书写" class="icon">
        </view>
        <view class="function-info">
          <text class="title">病历书写</text>
        </view>
        <view class="arrow">
          <uni-icons type="right" size="14" color="#CCCCCC"></uni-icons>
        </view>
      </view>

      <!-- 开处方 -->
      <view class="function-item" hover-class="item-hover" @click="goToPrescription">
        <view class="icon-wrapper prescription">
          <img src="../../static/icons/prescription.png" alt="开处方" class="icon">
        </view>
        <view class="function-info">
          <text class="title">开处方</text>
        </view>
        <view class="arrow">
          <uni-icons type="right" size="14" color="#CCCCCC"></uni-icons>
        </view>
      </view>

      <!-- 开检验检查 -->
      <view class="function-item" hover-class="item-hover" @click="goToExamination">
        <view class="icon-wrapper examination">
          <img src="../../static/icons/inspection.png" alt="开检验检查" class="icon">
        </view>
        <view class="function-info">
          <text class="title">开检验检查</text>
        </view>
        <view class="arrow">
          <uni-icons type="right" size="14" color="#CCCCCC"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onMounted } from 'vue'

// 跳转到病历书写
const goToMedicalRecord = () => {
  uni.navigateTo({
    url: '/pages/medical-record/index'
  })
}

// 跳转到开处方
const goToPrescription = () => {
  uni.navigateTo({
    url: '/pages/prescription/index'
  })
}

// 跳转到检验检查
const goToExamination = () => {
  uni.navigateTo({
    url: '/pages/examination/index'
  })
}

onMounted(() => {
  // 获取页面参数
  const query = uni.getStorageSync('patient_query') || {}
  const patientId = query.id
  console.log('页面参数:', query)
})
</script>

<style lang="scss">
.detail-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 24rpx;
}

.function-list {
  margin: 16rpx;
  border-radius: 16rpx;
  background: #ffffff;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.03);
  overflow: hidden;
}

.function-item {
  padding: 28rpx 24rpx;
  display: flex;
  align-items: center;
  position: relative;
  transition: background-color 0.2s;
  
  &:not(:last-child) {
    border-bottom: 1rpx solid #f5f5f5;
  }
}

.item-hover {
  background-color: #fafafa;
}

.icon-wrapper {
  width: 88rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
  border-radius: 16rpx;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.08;
  }
  
  .icon {
    width: 48rpx;
    height: 48rpx;
    object-fit: contain;
    position: relative;
    z-index: 2;
  }
}

.function-info {
  flex: 1;
  padding: 0 4rpx;
  
  .title {
    font-size: 30rpx;
    color: #333333;
    font-weight: 400;
  }
}

.arrow {
  padding: 8rpx;
  opacity: 0.6;
}
</style>