<script setup lang="ts">
defineOptions({
  name: "Welcome"
});
</script>

<template>
  <h1>Pure-Admin-Thin（非国际化版本）</h1>
  <h2>欢迎使用我们的管理系统</h2>
  <p>这是一个简单而强大的管理系统，旨在帮助您更有效地管理您的工作。</p>
  <button class="btn btn-primary">开始使用</button>
</template>

<style scoped>
h1 {
  color: #4caf50; /* 主标题颜色 */
  text-align: center; /* 居中对齐 */
}

h2 {
  color: #4caf50; /* 使用主题色 */
  text-align: center; /* 居中对齐 */
  margin-top: 10px; /* 顶部边距 */
}

p {
  text-align: center; /* 居中对齐 */
  margin: 15px 0; /* 上下边距 */
  font-size: 16px; /* 字体大小 */
  color: #666; /* 字体颜色 */
}

.btn {
  display: block; /* 块级元素 */
  margin: 0 auto; /* 居中对齐 */
  padding: 10px 20px; /* 内边距 */
  font-size: 16px; /* 字体大小 */
  background-color: #4caf50; /* 按钮背景颜色，使用主题色 */
  color: white; /* 按钮字体颜色 */
  border: none; /* 去掉边框 */
  border-radius: 5px; /* 圆角 */
  cursor: pointer; /* 鼠标指针样式 */
}

.btn:hover {
  background-color: #45a049; /* 悬停效果 */
}
</style>
