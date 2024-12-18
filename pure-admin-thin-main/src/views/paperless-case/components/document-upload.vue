<script setup lang="ts">
import { ref } from "vue";
import type { UploadProps, UploadUserFile } from "element-plus";

const props = defineProps<{
  caseId: string;
}>();

const emit = defineEmits<{
  (e: "success"): void;
}>();

const fileList = ref<UploadUserFile[]>([]);

const uploadHeaders = {
  // TODO: 添加认证信息
};

const handleSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  console.log(response, uploadFile);
  emit("success");
};

const handleError: UploadProps["onError"] = (error, uploadFile) => {
  console.error(error, uploadFile);
};

const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  // 文件类型限制
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (!allowedTypes.includes(rawFile.type)) {
    ElMessage.error("只能上传PDF/JPG/PNG文件!");
    return false;
  }
  
  // 文件大小限制（10MB）
  const maxSize = 10 * 1024 * 1024;
  if (rawFile.size > maxSize) {
    ElMessage.error("文件大小不能超过10MB!");
    return false;
  }
  
  return true;
};
</script>

<template>
  <div class="document-upload">
    <el-upload
      action="/api/documents/upload"
      :headers="uploadHeaders"
      :data="{ caseId: props.caseId }"
      :file-list="fileList"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
      multiple
    >
      <el-button type="primary">选择文件</el-button>
      <template #tip>
        <div class="el-upload__tip">
          只能上传PDF/JPG/PNG文件，且不超过10MB
        </div>
      </template>
    </el-upload>
  </div>
</template>

<style scoped>
.document-upload {
  padding: 20px;
}

.el-upload__tip {
  color: #909399;
  font-size: 12px;
  margin-top: 8px;
}
</style>
