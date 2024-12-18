<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  type: string; // doctor, nurse, patient
}>();

const emit = defineEmits<{
  (e: "success"): void;
  (e: "cancel"): void;
}>();

const canvas = ref<HTMLCanvasElement>();
let ctx: CanvasRenderingContext2D | null = null;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

const initCanvas = () => {
  if (!canvas.value) return;
  
  ctx = canvas.value.getContext("2d");
  if (!ctx) return;
  
  // 设置画布大小
  canvas.value.width = 600;
  canvas.value.height = 200;
  
  // 设置画笔样式
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  
  // 添加事件监听
  canvas.value.addEventListener("mousedown", startDrawing);
  canvas.value.addEventListener("mousemove", draw);
  canvas.value.addEventListener("mouseup", stopDrawing);
  canvas.value.addEventListener("mouseout", stopDrawing);
  
  // 触摸设备支持
  canvas.value.addEventListener("touchstart", handleTouch);
  canvas.value.addEventListener("touchmove", handleTouch);
  canvas.value.addEventListener("touchend", stopDrawing);
};

const startDrawing = (e: MouseEvent) => {
  isDrawing = true;
  [lastX, lastY] = [
    e.offsetX,
    e.offsetY
  ];
};

const draw = (e: MouseEvent) => {
  if (!isDrawing || !ctx) return;
  
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  
  [lastX, lastY] = [e.offsetX, e.offsetY];
};

const handleTouch = (e: TouchEvent) => {
  e.preventDefault();
  if (!canvas.value || !ctx) return;
  
  const rect = canvas.value.getBoundingClientRect();
  const touch = e.touches[0];
  
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  
  if (e.type === "touchstart") {
    isDrawing = true;
    [lastX, lastY] = [x, y];
  } else if (e.type === "touchmove" && isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    [lastX, lastY] = [x, y];
  }
};

const stopDrawing = () => {
  isDrawing = false;
};

const clearCanvas = () => {
  if (!ctx || !canvas.value) return;
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
};

const saveSignature = () => {
  if (!canvas.value) return;
  
  // 获取签名图片数据
  const signatureData = canvas.value.toDataURL("image/png");
  
  // TODO: 调用API保存签名
  console.log("保存签名:", signatureData);
  
  emit("success");
};

onMounted(() => {
  initCanvas();
});
</script>

<template>
  <div class="e-signature">
    <div class="signature-header">
      <h3>{{ props.type === 'doctor' ? '医生' : props.type === 'nurse' ? '护士' : '患者' }}签名</h3>
      <p class="signature-tip">请在下方空白处签名</p>
    </div>
    
    <div class="signature-canvas">
      <canvas ref="canvas" class="canvas" />
    </div>
    
    <div class="signature-actions">
      <el-button @click="clearCanvas">清除</el-button>
      <el-button type="primary" @click="saveSignature">确认</el-button>
      <el-button @click="emit('cancel')">取消</el-button>
    </div>
  </div>
</template>

<style scoped>
.e-signature {
  padding: 20px;
}

.signature-header {
  text-align: center;
  margin-bottom: 20px;
}

.signature-tip {
  color: #909399;
  font-size: 14px;
  margin-top: 8px;
}

.signature-canvas {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.canvas {
  background: #fff;
  cursor: crosshair;
}

.signature-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
