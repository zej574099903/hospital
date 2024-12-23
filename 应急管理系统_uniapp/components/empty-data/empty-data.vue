<template>
	<view class="empty-container" :style="{ marginTop: marginTop + 'rpx' }">
		<image class="empty-image" src="/static/empty.png" mode="aspectFit"></image>
		<text class="empty-text">{{ text || '暂无数据' }}</text>
		<text v-if="subText" class="empty-subtext">{{ subText }}</text>
	</view>
</template>

<script setup>
defineProps({
	text: {
		type: String,
		default: ''
	},
	subText: {
		type: String,
		default: ''
	},
	marginTop: {
		type: Number,
		default: 200
	}
})
</script>

<style lang="scss">
	.empty-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 40rpx;
		
		.empty-image {
			width: 240rpx;
			height: 240rpx;
			margin-bottom: 30rpx;
		}
		
		.empty-text {
			font-size: 28rpx;
			color: #999;
			margin-bottom: 12rpx;
		}
		
		.empty-subtext {
			font-size: 24rpx;
			color: #c0c4cc;
		}
	}
</style>
