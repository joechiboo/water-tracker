<template>
  <div class="quick-add card">
    <h3>快速累加</h3>

    <div class="quick-buttons">
      <button
        v-for="amount in quickAmounts"
        :key="amount"
        @click="handleQuickAdd(amount)"
        class="btn btn-primary btn-large quick-btn"
        :class="{ 'bounce': animatingButton === amount }"
      >
        +{{ amount }}ml
      </button>
    </div>

    <div class="custom-input">
      <div class="input-group">
        <input
          v-model.number="customAmount"
          type="number"
          placeholder="自定義容量"
          min="1"
          max="2000"
          class="custom-input-field"
          @keyup.enter="handleCustomAdd"
        >
        <button
          @click="handleCustomAdd"
          class="btn btn-secondary"
          :disabled="!isValidCustomAmount"
        >
          新增
        </button>
      </div>
    </div>

    <div class="action-buttons">
      <button
        @click="showResetConfirm = true"
        class="btn btn-secondary reset-btn"
      >
        重設今日
      </button>
    </div>

    <!-- 重設確認對話框 -->
    <div v-if="showResetConfirm" class="reset-confirm">
      <p>確定要重設今日記錄嗎？</p>
      <div class="confirm-buttons">
        <button @click="confirmReset" class="btn btn-primary">確定</button>
        <button @click="showResetConfirm = false" class="btn btn-secondary">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['add-water', 'reset-today'])

// 預設快速新增選項
const quickAmounts = [100, 250, 500, 1000]

// 響應式資料
const customAmount = ref('')
const animatingButton = ref(null)
const showResetConfirm = ref(false)

// 計算屬性
const isValidCustomAmount = computed(() => {
  const amount = Number(customAmount.value)
  return amount > 0 && amount <= 2000
})

// 方法
const handleQuickAdd = (amount) => {
  emit('add-water', amount, `快速累加 ${amount}ml`)

  // 觸發按鈕動畫
  animatingButton.value = amount
  setTimeout(() => {
    animatingButton.value = null
  }, 600)

  // 顯示成功回饋
  showSuccessMessage(`已新增 ${amount}ml`)
}

const handleCustomAdd = () => {
  if (!isValidCustomAmount.value) return

  const amount = Number(customAmount.value)
  emit('add-water', amount, `自定義 ${amount}ml`)

  // 清空輸入框
  customAmount.value = ''

  // 顯示成功回饋
  showSuccessMessage(`已新增 ${amount}ml`)
}

const confirmReset = () => {
  emit('reset-today')
  showResetConfirm.value = false
  showSuccessMessage('已重設今日記錄')
}

const showSuccessMessage = (message) => {
  // 這裡可以整合通知系統
  console.log('✅', message)
}
</script>

<style scoped>
.quick-add h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.quick-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.quick-btn {
  position: relative;
  overflow: hidden;
}

.quick-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

.quick-btn:active::before {
  width: 100px;
  height: 100px;
}

.custom-input {
  margin-bottom: 1.5rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

.custom-input-field {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.custom-input-field:focus {
  outline: none;
  border-color: #3498db;
}

.custom-input-field:invalid {
  border-color: #e74c3c;
}

.action-buttons {
  text-align: center;
}

.reset-btn {
  background-color: #e74c3c;
  color: white;
}

.reset-btn:hover {
  background-color: #c0392b;
}

.reset-confirm {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  text-align: center;
}

.reset-confirm::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.confirm-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

/* 動畫效果 */
.bounce {
  animation: bounce 0.6s;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}

@media (max-width: 768px) {
  .quick-buttons {
    grid-template-columns: repeat(2, 1fr);
  }

  .input-group {
    flex-direction: column;
  }

  .custom-input-field {
    margin-bottom: 0.5rem;
  }
}
</style>