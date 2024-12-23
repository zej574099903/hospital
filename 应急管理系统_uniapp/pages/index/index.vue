<template>
	<view class="container">
		<!-- 搜索栏 -->
		<view class="search-box">
			<uni-icons type="search" size="16" color="#666"></uni-icons>
			<input type="text" v-model="searchText" placeholder="搜索患者姓名/病历号" class="search-input" />
			<view class="scan-wrapper" @click="handleScan">
				<img class="scan-icon" src="../../static/icons/scan.png" alt="扫一扫" >
			</view>
		</view>

		<!-- 患者列表 -->
		<view class="patient-list">
			<template v-if="!loading">
				<template v-if="filteredPatients.length > 0">
					<view class="patient-item" v-for="(patient, index) in filteredPatients" :key="index" @click="goToPatientDetail(patient.id)">
						<view class="patient-info">
							<view class="patient-main">
								<view class="name-gender">
									<text class="patient-name">{{patient.name}}</text>
									<text class="patient-gender" :class="patient.gender === '男' ? 'male' : 'female'">{{patient.gender}}</text>
									<text class="patient-age">{{patient.age}}岁</text>
								</view>
								<text class="admission-time">{{patient.admissionTime}}</text>
							</view>
							<view class="divider"></view>
							<view class="patient-sub">
								<view class="sub-item">
									<text class="label">病历号</text>
									<text class="value">{{patient.patientNo}}</text>
								</view>
								<view class="sub-item">
									<text class="label">科室</text>
									<text class="value">{{patient.department}}</text>
								</view>
							</view>
						</view>
						<view class="arrow-right">
							<uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
						</view>
					</view>
				</template>
				<empty-data v-else :text="searchText ? '未找到相关患者' : '暂无患者数据'" :sub-text="searchText ? '换个搜索词试试' : ''" />
			</template>
		</view>
		
		<!-- 加载中 -->
		<loading :show="loading" />
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import EmptyData from '@/components/empty-data/empty-data.vue'
import Loading from '@/components/loading/loading.vue'

const loading = ref(true)
const searchText = ref('')
const patients = ref([
	{
		id: 1,
		name: '张三',
		gender: '男',
		age: 45,
		patientNo: '2023120001',
		department: '急诊内科',
		admissionTime: '2023-12-20 08:30'
	},
	{
		id: 2,
		name: '李四',
		gender: '女',
		age: 32,
		patientNo: '2023120002',
		department: '急诊外科',
		admissionTime: '2023-12-20 09:15'
	},
	{
		id: 3,
		name: '王五',
		gender: '男',
		age: 28,
		patientNo: '2023120003',
		department: '急诊内科',
		admissionTime: '2023-12-20 10:00'
	}
])

const filteredPatients = computed(() => {
	if (!searchText.value) return patients.value
	const keyword = searchText.value.toLowerCase()
	return patients.value.filter(patient => 
		patient.name.toLowerCase().includes(keyword) || 
		patient.patientNo.toLowerCase().includes(keyword)
	)
})

const goToPatientDetail = (patientId) => {
	uni.navigateTo({
		url: `/pages/medical-record/index?patientId=${patientId}`
	})
}

const handleScan = () => {
	uni.scanCode({
		success: (res) => {
			console.log('扫码结果：', res.result)
			// 这里可以根据扫码结果进行相应的处理
			// 比如跳转到相应的患者详情页
			if (res.result) {
				// 假设扫码结果是患者ID
				goToPatientDetail(res.result)
			}
		},
		fail: (err) => {
			uni.showToast({
				title: '扫码失败',
				icon: 'none'
			})
		}
	})
}

onMounted(() => {
	setTimeout(() => {
		loading.value = false
	}, 1000)
})
</script>

<style lang="scss">
.container {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding-bottom: 20rpx;
}

.search-box {
	background-color: #fff;
	padding: 20rpx 30rpx;
	display: flex;
	align-items: center;
	position: sticky;
	top: 0;
	z-index: 100;
	box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
	
	.uni-icons {
		margin-right: 20rpx;
	}
	
	.scan-wrapper {
		width: 56rpx;
		height: 56rpx;
		margin-left: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		
		&:active {
			opacity: 0.8;
		}
		
		.scan-icon {
			width: 44rpx;
			height: 44rpx;
			display: block;
		}
	}
}

.search-input {
	flex: 1;
	height: 72rpx;
	background-color: #f5f5f5;
	border-radius: 36rpx;
	padding: 0 30rpx;
	font-size: 28rpx;
}

.patient-list {
	padding: 20rpx;
}

.patient-item {
	background-color: #fff;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	display: flex;
	align-items: center;
	box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.03);
	
	&:last-child {
		margin-bottom: 0;
	}
}

.patient-info {
	flex: 1;
}

.patient-main {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.name-gender {
	display: flex;
	align-items: center;
}

.patient-name {
	font-size: 34rpx;
	font-weight: 600;
	color: #333;
	margin-right: 20rpx;
}

.patient-gender {
	padding: 4rpx 20rpx;
	border-radius: 20rpx;
	font-size: 24rpx;
	margin-right: 16rpx;
	
	&.male {
		background-color: rgba(24,144,255,0.1);
		color: #1890ff;
	}
	
	&.female {
		background-color: rgba(235,47,150,0.1);
		color: #eb2f96;
	}
}

.patient-age {
	font-size: 26rpx;
	color: #666;
}

.admission-time {
	font-size: 26rpx;
	color: #999;
}

.divider {
	height: 1rpx;
	background-color: #f0f0f0;
	margin: 20rpx 0;
}

.patient-sub {
	display: flex;
	gap: 40rpx;
}

.sub-item {
	display: flex;
	align-items: center;
	
	.label {
		font-size: 26rpx;
		color: #999;
		margin-right: 16rpx;
	}
	
	.value {
		font-size: 26rpx;
		color: #666;
	}
}

.arrow-right {
	margin-left: 20rpx;
	width: 40rpx;
	height: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
