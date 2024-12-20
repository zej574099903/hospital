<template>
  <view class="my-container">
    <view class="user-header">
      <image :src="userInfo.gender === '男' ? '/static/avatar/men.jpg' : '/static/avatar/women.png'" 
             class="avatar" mode="aspectFill"></image>
      <view class="user-details">
        <text class="user-name">{{userInfo.name}}</text>
        <text class="user-role">{{userInfo.role}}</text>
      </view>
    </view>
    <view class="info-list">
      <view class="info-item">
        <view class="info-left">
          <uni-icons type="hospital" size="20" color="#666"></uni-icons>
          <text class="info-label">所属医院</text>
        </view>
        <text class="info-value">{{userInfo.hospital}}</text>
      </view>
      <view class="info-item">
        <view class="info-left">
          <uni-icons type="staff" size="20" color="#666"></uni-icons>
          <text class="info-label">所属科室</text>
        </view>
        <text class="info-value">{{userInfo.department}}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: '张医生',
        gender: '男',
        role: '主治医师',
        hospital: '杭州市第二人民医院',
        department: '急诊科'
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.my-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.user-header {
  display: flex;
  align-items: center;
  padding: 40rpx 30rpx;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.avatar {
  width: 140rpx;
  height: 140rpx;
  border-radius: 70rpx;
  margin-right: 30rpx;
  background-color: #f0f0f0;
  border: 4rpx solid #ffffff;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 40rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 12rpx;
}

.user-role {
  font-size: 28rpx;
  color: #666;
  background-color: #f5f5f5;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
}

.info-list {
  background-color: #ffffff;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  border-bottom: 1px solid #f5f5f5;
  
  &:last-child {
    border-bottom: none;
  }
}

.info-left {
  display: flex;
  align-items: center;
  
  .uni-icons {
    margin-right: 16rpx;
  }
}

.info-label {
  font-size: 30rpx;
  color: #333;
}

.info-value {
  font-size: 30rpx;
  color: #666;
}
</style>
