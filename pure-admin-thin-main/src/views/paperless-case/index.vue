<template>
  <div class="paperless-case">
    <div class="search-bar">
      <el-input
        v-model="searchQuery"
        placeholder="搜索病例"
        prefix-icon="el-icon-search"
        clearable
      />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button type="success" @click="handleAdd">新增病例</el-button>
    </div>

    <el-table :data="caseList" style="width: 100%" border>
      <el-table-column prop="caseNo" label="病例号" width="120" />
      <el-table-column prop="patientName" label="患者姓名" width="120" />
      <el-table-column prop="gender" label="性别" width="80" />
      <el-table-column prop="age" label="年龄" width="80" />
      <el-table-column prop="department" label="科室" width="120" />
      <el-table-column prop="doctor" label="主治医生" width="120" />
      <el-table-column prop="date" label="就诊日期" width="180" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === '已完成' ? 'success' : 'warning'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="180">
        <template #default="{ row }">
          <el-space wrap>
            <el-tooltip
              effect="dark"
              content="查看病例详情"
              placement="top"
            >
              <el-button
                type="primary"
                link
                :icon="View"
                @click="handleView(row)"
              />
            </el-tooltip>
            
            <el-tooltip
              effect="dark"
              content="编辑病例信息"
              placement="top"
            >
              <el-button
                type="primary"
                link
                :icon="Edit"
                :disabled="row.status === '已归档'"
                @click="handleEdit(row)"
              />
            </el-tooltip>

            <el-tooltip
              effect="dark"
              content="归档病例"
              placement="top"
            >
              <el-button
                type="primary"
                link
                :icon="Files"
                :disabled="row.status === '已归档'"
                @click="handleArchive(row)"
              />
            </el-tooltip>

            <el-tooltip
              effect="dark"
              content="删除病例"
              placement="top"
            >
              <el-button
                type="danger"
                link
                :icon="Delete"
                :disabled="row.status === '已归档'"
                @click="handleDelete(row)"
              />
            </el-tooltip>
          </el-space>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        layout="total, prev, pager, next"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 新增/编辑病例弹窗 -->
    <el-dialog
      :title="dialogType === 'add' ? '新增病例' : '编辑病例'"
      v-model="dialogVisible"
      width="50%"
    >
      <el-form :model="caseForm" label-width="100px">
        <el-form-item label="患者姓名">
          <el-input v-model="caseForm.patientName" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="caseForm.gender" placeholder="请选择">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="caseForm.age" type="number" />
        </el-form-item>
        <el-form-item label="科室">
          <el-select v-model="caseForm.department" placeholder="请选择">
            <el-option label="内科" value="内科" />
            <el-option label="外科" value="外科" />
            <el-option label="儿科" value="儿科" />
            <el-option label="妇科" value="妇科" />
          </el-select>
        </el-form-item>
        <el-form-item label="主治医生">
          <el-input v-model="caseForm.doctor" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 查看病例详情弹窗 -->
    <el-dialog
      title="病例详情"
      v-model="viewDialogVisible"
      width="50%"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="病例号">{{ currentCase.caseNo }}</el-descriptions-item>
        <el-descriptions-item label="患者姓名">{{ currentCase.patientName }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ currentCase.gender }}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{ currentCase.age }}</el-descriptions-item>
        <el-descriptions-item label="科室">{{ currentCase.department }}</el-descriptions-item>
        <el-descriptions-item label="主治医生">{{ currentCase.doctor }}</el-descriptions-item>
        <el-descriptions-item label="就诊日期">{{ currentCase.date }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ currentCase.status }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 文书上传对话框 -->
    <el-dialog
      v-model="showUpload"
      title="上传病历文书"
      width="50%"
      destroy-on-close
    >
      <document-upload
        :case-id="currentCaseId"
        @success="handleUploadSuccess"
      />
    </el-dialog>

    <!-- 电子签名对话框 -->
    <el-dialog
      v-model="showSignature"
      title="电子签名"
      width="50%"
      destroy-on-close
    >
      <e-signature
        :type="signatureType"
        @success="handleSignatureSuccess"
        @cancel="handleSignatureCancel"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import CaseDetail from "./components/case-detail.vue";
import DocumentUpload from "./components/document-upload.vue";
import ESignature from "./components/e-signature.vue";
import { View, Edit, Delete, Files } from "@element-plus/icons-vue";

interface CaseForm {
  patientName: string;
  gender: string;
  age: number;
  department: string;
  doctor: string;
}

const searchQuery = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(100);

// 弹窗控制
const dialogVisible = ref(false);
const viewDialogVisible = ref(false);
const dialogType = ref<"add" | "edit">("add");
const showUpload = ref(false);
const showSignature = ref(false);
const signatureType = ref("");
const currentCaseId = ref("");

// 当前操作的病例数据
const currentCase = ref({
  caseNo: "",
  patientName: "",
  gender: "",
  age: "",
  department: "",
  doctor: "",
  date: "",
  status: ""
});

// 表单数据
const caseForm = ref<CaseForm>({
  patientName: "",
  gender: "",
  age: 0,
  department: "",
  doctor: ""
});

// 模拟数据
const caseList = ref([
  {
    caseNo: "CN2023001",
    patientName: "张三",
    gender: "男",
    age: "45",
    department: "内科",
    doctor: "李医生",
    date: "2023-12-18",
    status: "已完成"
  },
  {
    caseNo: "CN2023002",
    patientName: "李四",
    gender: "女",
    age: "32",
    department: "外科",
    doctor: "王医生",
    date: "2023-12-18",
    status: "进行中"
  }
]);

// 搜索
const handleSearch = () => {
  ElMessage.success("执行搜索操作，关键词：" + searchQuery.value);
};

// 新增
const handleAdd = () => {
  dialogType.value = "add";
  caseForm.value = {
    patientName: "",
    gender: "",
    age: 0,
    department: "",
    doctor: ""
  };
  dialogVisible.value = true;
};

// 查看
const handleView = (row: any) => {
  currentCase.value = { ...row };
  viewDialogVisible.value = true;
};

// 编辑
const handleEdit = (row: any) => {
  dialogType.value = "edit";
  caseForm.value = {
    patientName: row.patientName,
    gender: row.gender,
    age: row.age,
    department: row.department,
    doctor: row.doctor
  };
  currentCase.value = { ...row };
  dialogVisible.value = true;
};

// 删除
const handleDelete = (row: any) => {
  ElMessageBox.confirm(
    `确定要删除患者 ${row.patientName} 的病例记录吗？`,
    "警告",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  ).then(() => {
    // 这里添加删除逻辑
    const index = caseList.value.findIndex(item => item.caseNo === row.caseNo);
    if (index > -1) {
      caseList.value.splice(index, 1);
      ElMessage.success("删除成功");
    }
  }).catch(() => {
    ElMessage.info("已取消删除");
  });
};

// 保存
const handleSave = () => {
  if (dialogType.value === "add") {
    // 模拟新增
    const newCase = {
      caseNo: `CN${Date.now()}`,
      ...caseForm.value,
      date: new Date().toISOString().split("T")[0],
      status: "进行中"
    };
    caseList.value.unshift(newCase);
    ElMessage.success("新增成功");
  } else {
    // 模拟编辑
    const index = caseList.value.findIndex(item => item.caseNo === currentCase.value.caseNo);
    if (index > -1) {
      caseList.value[index] = {
        ...caseList.value[index],
        ...caseForm.value
      };
      ElMessage.success("编辑成功");
    }
  }
  dialogVisible.value = false;
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  // 这里可以添加分页查询逻辑
};

const handleArchive = (row: any) => {
  ElMessageBox.confirm(
    "确定要归档此病例吗？归档后将无法修改。",
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  ).then(() => {
    // TODO: 实现归档逻辑
    row.status = "已归档";
    ElMessage.success("归档成功");
  }).catch(() => {});
};

const handleUploadSuccess = () => {
  showUpload.value = false;
  handleSearch(); // 刷新列表
  ElMessage.success("上传成功");
};

const handleSignatureSuccess = () => {
  showSignature.value = false;
  handleSearch(); // 刷新列表
  ElMessage.success("签名成功");
};

const handleSignatureCancel = () => {
  showSignature.value = false;
};

const handleSign = (type: string) => {
  signatureType.value = type;
  showSignature.value = true;
};

onMounted(() => {
  handleSearch();
});
</script>

<style scoped>
.paperless-case {
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-button.is-link) {
  padding: 4px;
}

:deep(.el-space) {
  gap: 8px !important;
}
</style>
