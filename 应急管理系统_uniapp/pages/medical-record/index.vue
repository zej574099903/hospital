<template>
  <view class="medical-record">
    <!-- 患者信息卡片 -->
    <view class="patient-card">
      <view class="patient-info">
        <text class="gender-age">患者：</text>
        <text class="name">{{ patientInfo.name }}</text>
        <text class="info">{{ patientInfo.gender }} {{ patientInfo.age }}岁</text>
      </view>
    </view>

    <!-- 表单内容 -->
    <view class="container">
      <view class="form-wrapper">
        <!-- 诊断信息 -->
        <view class="form-section">
          <view class="form-group">
            <view class="group-title">
              <text class="required">*</text>
              <text>西医诊断</text>
              <view class="add-btn" @click="addDiagnosis('western')">
                <text class="iconfont icon-add"></text>
                <text class="iconfont icon-plus"></text>
                <text style="color: #fff;">追加</text>
              </view>
            </view>
            <view v-for="(item, index) in formData.westernDiagnosis" :key="index" class="diagnosis-item">
              <input v-model="item.value" class="input-field" placeholder="请输入诊断内容" />
              <button v-if="index > 0" class="mini-delete-btn" @click="removeDiagnosis('western', index)">删除</button>
            </view>
          </view>
        </view>

        <view class="form-section">
          <view class="form-group">
            <view class="group-title">
              <text class="required">*</text>
              <text>中医诊断</text>
              <view class="add-btn" @click="addDiagnosis('chinese')">
                <text class="iconfont icon-add"></text>
                <text class="iconfont icon-plus"></text>
                <text style="color: #fff;">追加</text>
              </view>
            </view>
            <view v-for="(item, index) in formData.chineseDiagnosis" :key="index" class="diagnosis-item">
              <input v-model="item.value" class="input-field" placeholder="请输入诊断内容" />
              <button v-if="index > 0" class="mini-delete-btn" @click="removeDiagnosis('chinese', index)">删除</button>
            </view>
          </view>
        </view>

        <view class="form-section">
          <view class="form-group">
            <view class="group-title">
              <text class="required">*</text>
              <text>中医证型</text>
              <view class="add-btn" @click="addDiagnosis('syndrome')">
                <text class="iconfont icon-add"></text>
                <text class="iconfont icon-plus"></text>
                <text style="color: #fff;">追加</text>
              </view>
            </view>
            <view v-for="(item, index) in formData.syndrome" :key="index" class="diagnosis-item">
              <input v-model="item.value" class="input-field" placeholder="请输入证型内容" />
              <button v-if="index > 0" class="mini-delete-btn" @click="removeDiagnosis('syndrome', index)">删除</button>
            </view>
          </view>
        </view>

        <view class="form-section">
          <view class="form-group">
            <view class="group-title">
              <text class="required">*</text>
              <text>中医证候</text>
              <view class="add-btn" @click="addDiagnosis('symptoms')">
                <text class="iconfont icon-add"></text>
                <text class="iconfont icon-plus"></text>
                <text style="color: #fff;">追加</text>
              </view>
            </view>
            <view v-for="(item, index) in formData.symptoms" :key="index" class="diagnosis-item">
              <input v-model="item.value" class="input-field" placeholder="请输入证候内容" />
              <button v-if="index > 0" class="mini-delete-btn" @click="removeDiagnosis('symptoms', index)">删除</button>
            </view>
          </view>
        </view>

        <!-- 主述 -->
        <view class="form-section">
          <view class="form-group">
            <view class="group-title">
              <text class="required">*</text>
              <text>主述</text>
            </view>
            <view class="form-content">
              <textarea v-model="formData.mainComplaint" placeholder="请输入主述内容" />
            </view>
          </view>
        </view>

        <!-- 病史摘要 -->
        <view class="form-section">
          <view class="form-group">
            <view class="group-title">
              <text class="required">*</text>
              <text>病史摘要</text>
            </view>
            <view class="form-content">
              <textarea v-model="formData.medicalHistory" placeholder="请输入病史摘要" />
            </view>
          </view>
        </view>

        <!-- 既往史 -->
        <view class="form-section">
          <view class="form-group">
            <view class="group-title">
              <text class="required">*</text>
              <text>既往史</text>
            </view>
            <view class="form-content">
              <textarea v-model="formData.pastHistory" placeholder="请输入既往史" />
            </view>
          </view>
        </view>

        <!-- 处理方法 -->
        <view class="form-section">
          <view class="form-group">
            <view class="group-title">
              <text class="required">*</text>
              <text>处理方法</text>
            </view>
            <view class="form-content">
              <textarea v-model="formData.treatment" placeholder="请输入处理方法" />
            </view>
          </view>
        </view>

        <!-- 辅助检查 -->
        <view class="form-section">
          <view class="form-group">
            <view class="group-title">
              <text class="required">*</text>
              <text>辅助检查</text>
            </view>
            <view class="form-content">
              <textarea v-model="formData.auxiliaryExamination" placeholder="请输入辅助检查" />
            </view>
          </view>
        </view>

        <!-- 注意事项 -->
        <view class="form-section">
          <view class="form-group">
            <view class="group-title">
              <text class="required">*</text>
              <text>注意事项</text>
            </view>
            <view class="form-content">
              <textarea v-model="formData.notes" placeholder="请输入注意事项" />
            </view>
          </view>
        </view>

        <!-- 个人信息 -->
        <view class="form-section">
          <view class="form-group">
            <view class="group-title">
              <text class="required">*</text>
              <text>个人信息</text>
            </view>
            <view class="personal-info">
              <view class="info-grid">
                <view class="info-item">
                  <text class="label">身高</text>
                  <view class="input-wrapper">
                    <input type="number" v-model="formData.height" class="input-field" />
                    <text class="unit">cm</text>
                  </view>
                </view>
                <view class="info-item">
                  <text class="label">体重</text>
                  <view class="input-wrapper">
                    <input type="number" v-model="formData.weight" class="input-field" />
                    <text class="unit">kg</text>
                  </view>
                </view>
                <view class="info-item">
                  <text class="label">BMI</text>
                  <view class="input-wrapper">
                    <input type="number" v-model="formData.bmi" class="input-field" />
                    <text class="unit">kg/m²</text>
                  </view>
                </view>
                <view class="info-item">
                  <text class="label">血压</text>
                  <view class="input-wrapper">
                    <input type="text" v-model="formData.bloodPressure" class="input-field" />
                    <text class="unit">mmHg</text>
                  </view>
                </view>
                <view class="info-item">
                  <text class="label">脉搏</text>
                  <view class="input-wrapper">
                    <input type="number" v-model="formData.pulse" class="input-field" />
                    <text class="unit">次/分</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部操作栏 -->
      <view class="bottom-bar">
        <view class="action-buttons">
          <view class="action-btn" @click="goToPrescription">
            <image src="../../static/icons/prescription.png" mode="aspectFit" class="action-icon"></image>
            <text>开处方</text>
          </view>
          <view class="action-btn" @click="goToInspection">
            <image src="../../static/icons/inspection.png" mode="aspectFit" class="action-icon"></image>
            <text>检验检查</text>
          </view>
        </view>
        <button class="submit-btn" @click="handleSubmit">提交</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 患者信息
const patientId = ref('')
const patientInfo = ref({
  name: '',
  gender: '',
  age: ''
})

// 表单数据
const formData = ref({
  westernDiagnosis: [{ value: '' }],
  chineseDiagnosis: [{ value: '' }],
  syndrome: [{ value: '' }],
  symptoms: [{ value: '' }],
  mainComplaint: '',
  medicalHistory: '',
  pastHistory: '',
  treatment: '',
  auxiliaryExamination: '',
  notes: '',
  height: '',
  weight: '',
  bmi: '',
  bloodPressure: '',
  pulse: ''
})

const isSubmitted = ref(false)

// 添加诊断项
const addDiagnosis = (type) => {
  switch(type) {
    case 'western':
      formData.value.westernDiagnosis.push({ value: '' })
      break
    case 'chinese':
      formData.value.chineseDiagnosis.push({ value: '' })
      break
    case 'syndrome':
      formData.value.syndrome.push({ value: '' })
      break
    case 'symptoms':
      formData.value.symptoms.push({ value: '' })
      break
  }
}

// 删除诊断项
const removeDiagnosis = (type, index) => {
  switch(type) {
    case 'western':
      if (formData.value.westernDiagnosis.length > 1) {
        formData.value.westernDiagnosis.splice(index, 1)
      }
      break
    case 'chinese':
      if (formData.value.chineseDiagnosis.length > 1) {
        formData.value.chineseDiagnosis.splice(index, 1)
      }
      break
    case 'syndrome':
      if (formData.value.syndrome.length > 1) {
        formData.value.syndrome.splice(index, 1)
      }
      break
    case 'symptoms':
      if (formData.value.symptoms.length > 1) {
        formData.value.symptoms.splice(index, 1)
      }
      break
  }
}

// 验证表单
const validateForm = () => {
  // 验证诊断信息
  if (!formData.value.westernDiagnosis.some(item => item.value.trim())) {
    uni.showToast({
      title: '请填写西医诊断',
      icon: 'none'
    })
    return false
  }
  
  if (!formData.value.chineseDiagnosis.some(item => item.value.trim())) {
    uni.showToast({
      title: '请填写中医诊断',
      icon: 'none'
    })
    return false
  }
  
  if (!formData.value.syndrome.some(item => item.value.trim())) {
    uni.showToast({
      title: '请填写中医证型',
      icon: 'none'
    })
    return false
  }
  
  if (!formData.value.symptoms.some(item => item.value.trim())) {
    uni.showToast({
      title: '请填写中医证候',
      icon: 'none'
    })
    return false
  }

  // 验证文本域
  const textFields = [
    { field: 'mainComplaint', name: '主述' },
    { field: 'medicalHistory', name: '病史摘要' },
    { field: 'pastHistory', name: '既往史' },
    { field: 'treatment', name: '处理方法' },
    { field: 'auxiliaryExamination', name: '辅助检查' },
    { field: 'notes', name: '注意事项' }
  ]

  for (const { field, name } of textFields) {
    if (!formData.value[field].trim()) {
      uni.showToast({
        title: `请填写${name}`,
        icon: 'none'
      })
      return false
    }
  }

  // 验证个人信息
  const personalFields = [
    { field: 'height', name: '身高' },
    { field: 'weight', name: '体重' },
    { field: 'bmi', name: 'BMI' },
    { field: 'bloodPressure', name: '血压' },
    { field: 'pulse', name: '脉搏' }
  ]

  for (const { field, name } of personalFields) {
    if (!formData.value[field]) {
      uni.showToast({
        title: `请填写${name}`,
        icon: 'none'
      })
      return false
    }
  }

  return true
}

// 跳转到处方页面
const goToPrescription = () => {
  if (!isSubmitted.value) {
    uni.showModal({
      title: '提示',
      content: '请先提交病历后再开具处方',
      showCancel: false
    })
    return
  }
  uni.navigateTo({
    url: `/pages/prescription/index?patientId=${patientId.value}`
  })
}

// 跳转到检验检查页面
const goToInspection = () => {
  if (!isSubmitted.value) {
    uni.showModal({
      title: '提示',
      content: '请先提交病历后再开具检验检查',
      showCancel: false
    })
    return
  }
  uni.navigateTo({
    url: `/pages/inspection/index?patientId=${patientId.value}`
  })
}

// 提交表单
const handleSubmit = () => {
  if (!validateForm()) return
  
  // TODO: 提交表单逻辑
  uni.showLoading({
    title: '提交中...'
  })
  
  setTimeout(() => {
    uni.hideLoading()
    isSubmitted.value = true
    uni.showToast({
      title: '提交成功',
      icon: 'success'
    })
  }, 1500)
}

onMounted(() => {
  // 获取患者信息
  const query = uni.getStorageSync('patient_query') || {}
  patientId.value = query.patientId || ''
  patientInfo.value = {
    name: query.name || '张三',  // 测试数据
    gender: query.gender || '男',
    age: query.age || '45'
  }
})
</script>

<style lang="scss">
.medical-record {
  min-height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  padding-bottom: 240rpx;
}

.patient-card {
  background-color: #ffffff;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);

  .patient-info {
    display: flex;
    align-items: center;
    gap: 24rpx;

    .gender-age {
      font-size: 32rpx;
      font-weight: 600;
      color: #333333;
    }

    .name {
      font-size: 32rpx;
      color: #666666;
    }

    .info {
      font-size: 28rpx;
      color: #999999;
    }
  }
}

.container {
  flex: 1;
  padding: 0 24rpx;
}

.form-wrapper {
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}

.form-section {
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}

.form-group {
  .group-title {
    display: flex;
    align-items: center;
    margin-bottom: 24rpx;
    
    .required {
      color: #f5222d !important;
      margin-right: 12rpx;
      font-size: 28rpx;
    }

    text {
      font-size: 32rpx;
      color: #333333;
      font-weight: 500;
    }
  }
}

.form-content {
  width: 100%;
  
  textarea {
    width: 100%;
    min-height: 240rpx;
    padding: 24rpx;
    font-size: 30rpx;
    line-height: 1.5;
    border: 2rpx solid #e8e8e8;
    border-radius: 16rpx;
    box-sizing: border-box;
    background-color: #fafafa;
    
    &:focus {
      border-color: #40a9ff;
      background-color: #ffffff;
    }
  }
}

.diagnosis-item {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
  gap: 16rpx;

  .input-field {
    flex: 1;
    height: 80rpx;
    border: none;
    border-bottom: 2rpx solid #e8e8e8;
    padding: 0 24rpx;
    font-size: 30rpx;
    background-color: transparent;
    
    &:focus {
      border-bottom-color: #40a9ff;
    }
  }

  .mini-delete-btn {
    padding: 8rpx 24rpx;
    font-size: 24rpx;
    color: #999999;
    background: none;
    border: none;
    line-height: 1.5;
    height: 80rpx;
    display: flex;
    align-items: center;
    
    &:active {
      opacity: 0.8;
    }
  }
}

.add-btn {
  margin-left: auto;
  display: flex;
  align-items: center;
  padding: 12rpx 32rpx;
  background: linear-gradient(135deg, #1890ff, #40a9ff);
  color: #ffffff;
  border-radius: 32rpx;
  border: none;
  font-size: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.2);
  
  .iconfont {
    margin-right: 8rpx;
    font-size: 28rpx;
    color: #ffffff;
  }
  
  &:active {
    opacity: 0.9;
    transform: translateY(2rpx);
  }
}

.personal-info {
  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32rpx;
    padding: 16rpx 0;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
    
    .label {
      font-size: 28rpx;
      color: #666666;
    }
    
    .input-wrapper {
      display: flex;
      align-items: center;
      background-color: #f5f7fa;
      border-radius: 8rpx;
      padding: 0 24rpx;
      height: 80rpx;
      
      .input-field {
        flex: 1;
        border: none;
        background: transparent;
        font-size: 30rpx;
        color: #333333;
      }
      
      .unit {
        margin-left: 16rpx;
        color: #999999;
        font-size: 28rpx;
      }
    }
  }
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.04);
  z-index: 100;
  
  .action-buttons {
    display: flex;
    justify-content: space-around;
    padding: 24rpx 32rpx;
    border-bottom: 2rpx solid #f0f0f0;
    
    .action-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20rpx 48rpx;
      border-radius: 16rpx;
      background-color: #f0f5ff;
      
      &:active {
        opacity: 0.8;
      }
      
      .action-icon {
        width: 48rpx;
        height: 48rpx;
        margin-bottom: 12rpx;
      }
      
      text {
        font-size: 28rpx;
        color: #1890ff;
      }
    }
  }
  
  .submit-btn {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    font-size: 32rpx;
    color: #ffffff;
    background: linear-gradient(135deg, #1890ff, #40a9ff);
    border: none;
    
    &:active {
      opacity: 0.9;
    }
  }
}

::-webkit-scrollbar {
  display: none;
}
</style>
