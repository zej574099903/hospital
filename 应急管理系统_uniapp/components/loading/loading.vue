<template>
	<view class="loading-container" v-if="show">
		<view class="loading-content">
			<view class="loading-spinner">
				<view class="loading-circle"></view>
			</view>
			<text class="loading-text">{{ text }}</text>
		</view>
	</view>
</template>

<script setup>
defineProps({
	show: {
		type: Boolean,
		default: true
	},
	text: {
		type: String,
		default: '加载中...'
	}
})
</script>

<style lang="scss">
	.loading-container {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 9999;
		background-color: rgba(255, 255, 255, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		
		.loading-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			transform: translateY(-40rpx);
		}
		
		.loading-spinner {
			width: 60rpx;
			height: 60rpx;
			margin-bottom: 20rpx;
			position: relative;
			
			.loading-circle {
				width: 100%;
				height: 100%;
				border: 4rpx solid #f0f0f0;
				border-top-color: #1890ff;
				border-radius: 50%;
				animation: spin 0.8s linear infinite;
			}
		}
		
		.loading-text {
			font-size: 28rpx;
			color: #666;
		}
	}
	
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
