<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Document, DataLine, Setting } from '@element-plus/icons-vue';

defineOptions({
  name: "Welcome"
});

const router = useRouter();
const currentTime = ref(new Date().toLocaleTimeString());

setInterval(() => {
  currentTime.value = new Date().toLocaleTimeString();
}, 1000);

const handleStart = () => {
  router.push("/paperless-case/list");
};
</script>

<template>
  <div class="welcome-container">
    <div class="welcome-content">
      <div class="welcome-header">
        <h1>医疗管理系统</h1>
        <div class="time-display">{{ currentTime }}</div>
      </div>
      
      <div class="feature-cards">
        <el-card class="feature-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon><Document /></el-icon>
              <span>无纸化病例管理</span>
            </div>
          </template>
          <p>高效的电子病历系统，支持快速录入、查询和管理患者信息</p>
          <el-button type="primary" @click="handleStart">立即使用</el-button>
        </el-card>
        
        <el-card class="feature-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon><DataLine /></el-icon>
              <span>数据统计</span>
            </div>
          </template>
          <p>直观的数据分析和统计功能，帮助您更好地了解医疗数据</p>
        </el-card>
        
        <el-card class="feature-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon><Setting /></el-icon>
              <span>系统管理</span>
            </div>
          </template>
          <p>灵活的系统配置和用户管理，确保系统安全和高效运行</p>
        </el-card>
      </div>

      <div class="welcome-footer">
        <p> {{ new Date().getFullYear() }} 医疗管理系统. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
  padding: 20px;
}

.welcome-content {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  position: relative;
}

.welcome-header h1 {
  color: #2c3e50;
  font-size: 2.5em;
  margin: 0;
  font-weight: 600;
}

.time-display {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 1.2em;
  color: #666;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 40px 0;
}

.feature-card {
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2em;
  color: #2c3e50;
}

.card-header .el-icon {
  font-size: 1.5em;
  color: var(--el-color-primary);
}

.feature-card p {
  color: #666;
  line-height: 1.6;
  margin: 16px 0;
}

.feature-card .el-button {
  width: 100%;
  margin-top: 16px;
}

.welcome-footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: #666;
  border-top: 1px solid #eee;
}

@media (max-width: 768px) {
  .feature-cards {
    grid-template-columns: 1fr;
  }
  
  .time-display {
    position: static;
    margin: 20px auto;
    width: fit-content;
  }
}
</style>
