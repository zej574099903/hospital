<script setup lang="ts">
import { ref } from "vue";
import type { UploadProps } from "element-plus";

const props = defineProps<{
  caseData: any;
  readonly?: boolean;
}>();

const activeTab = ref("basic");

// 文书上传
const handleUpload: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  console.log(response, uploadFile);
};

// 文书预览
const handlePreview = (file: any) => {
  console.log(file);
};

// 电子签名
const handleSign = (type: string) => {
  console.log("签名类型:", type);
};
</script>

<template>
  <div class="case-detail">
    <el-tabs v-model="activeTab">
      <!-- 基本信息 -->
      <el-tab-pane label="基本信息" name="basic">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="病例号">
            {{ props.caseData.caseNo }}
          </el-descriptions-item>
          <el-descriptions-item label="患者姓名">
            {{ props.caseData.patientName }}
          </el-descriptions-item>
          <el-descriptions-item label="性别">
            {{ props.caseData.gender }}
          </el-descriptions-item>
          <el-descriptions-item label="年龄">
            {{ props.caseData.age }}
          </el-descriptions-item>
          <el-descriptions-item label="入院日期">
            {{ props.caseData.admissionDate }}
          </el-descriptions-item>
          <el-descriptions-item label="出院日期">
            {{ props.caseData.dischargeDate }}
          </el-descriptions-item>
          <el-descriptions-item label="科室">
            {{ props.caseData.department }}
          </el-descriptions-item>
          <el-descriptions-item label="主治医生">
            {{ props.caseData.doctor }}
          </el-descriptions-item>
          <el-descriptions-item label="诊断" :span="2">
            {{ props.caseData.diagnosis }}
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>

      <!-- 病历文书 -->
      <el-tab-pane label="病历文书" name="documents">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-card class="document-list">
              <template #header>
                <div class="card-header">
                  <span>文书列表</span>
                  <el-button
                    v-if="!props.readonly"
                    type="primary"
                    size="small"
                  >
                    上传文书
                  </el-button>
                </div>
              </template>
              
              <el-table :data="props.caseData.documents" stripe border>
                <el-table-column type="index" label="序号" width="80" />
                <el-table-column prop="name" label="文书名称" />
                <el-table-column prop="date" label="上传时间" width="180" />
                <el-table-column prop="status" label="状态" width="120">
                  <template #default="{ row }">
                    <el-tag :type="row.status === '已签名' ? 'success' : 'warning'">
                      {{ row.status }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="200" fixed="right">
                  <template #default="{ row }">
                    <el-button-group>
                      <el-button
                        size="small"
                        @click="handlePreview(row)"
                      >
                        预览
                      </el-button>
                      <el-button
                        v-if="!props.readonly && row.status !== '已签名'"
                        size="small"
                        type="primary"
                        @click="handleSign(row.type)"
                      >
                        签名
                      </el-button>
                    </el-button-group>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          
          <el-col :span="8">
            <el-card class="sign-status">
              <template #header>
                <div class="card-header">
                  <span>签名状态</span>
                </div>
              </template>
              
              <el-timeline>
                <el-timeline-item
                  v-for="(status, type) in props.caseData.signStatus"
                  :key="type"
                  :type="status ? 'success' : 'warning'"
                  :timestamp="status ? '已签名' : '未签名'"
                >
                  {{ type === 'doctor' ? '医生签名' : type === 'nurse' ? '护士签名' : '患者签名' }}
                </el-timeline-item>
              </el-timeline>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- 归档信息 -->
      <el-tab-pane label="归档信息" name="archive">
        <el-empty v-if="props.caseData.status !== '已归档'" description="暂未归档" />
        <el-descriptions v-else :column="2" border>
          <el-descriptions-item label="归档时间">
            {{ props.caseData.archiveTime }}
          </el-descriptions-item>
          <el-descriptions-item label="归档人">
            {{ props.caseData.archiveBy }}
          </el-descriptions-item>
          <el-descriptions-item label="归档备注" :span="2">
            {{ props.caseData.archiveNote }}
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.case-detail {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.document-list {
  margin-bottom: 20px;
}

:deep(.el-timeline-item__node--large) {
  width: 14px;
  height: 14px;
}

:deep(.el-timeline-item__wrapper) {
  padding-left: 28px;
}
</style>
