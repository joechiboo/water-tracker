<template>
  <div class="quick-add card">
    <h3>快速累加</h3>

    <div class="quick-buttons">
      <button
        v-for="amount in sortedAllAmounts"
        :key="amount"
        @click="handleQuickAdd(amount)"
        class="btn btn-primary btn-large quick-btn"
        :class="{
          'bounce': animatingButton === amount,
          'custom-amount': isCustomAmount(amount)
        }"
        @contextmenu.prevent="isCustomAmount(amount) && removeCustomAmount(amount)"
        :title="isCustomAmount(amount) ? '右鍵點擊移除自訂義容量' : ''"
      >
        +{{ amount }}ml
        <span v-if="isCustomAmount(amount)" class="custom-badge">自訂</span>
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
        @click="handleReset"
        class="btn btn-secondary reset-btn"
      >
        重設今日
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['add-water', 'reset-today'])

// 預設快速新增選項 - 改為 50, 100, 250, 500
const defaultQuickAmounts = [50, 100, 250, 500]

// 響應式資料
const quickAmounts = ref([...defaultQuickAmounts])
const customAmount = ref('')
const animatingButton = ref(null)
const customAmounts = ref([]) // 儲存自訂義容量

// 計算屬性 - 合併並排序所有容量選項
const sortedAllAmounts = computed(() => {
  const allAmounts = [...new Set([...defaultQuickAmounts, ...customAmounts.value])]
  return allAmounts.sort((a, b) => a - b)
})

// 計算屬性
const isValidCustomAmount = computed(() => {
  const amount = Number(customAmount.value)
  return amount > 0 && amount <= 2000
})

// 載入儲存的自訂義容量
onMounted(() => {
  const saved = localStorage.getItem('customWaterAmounts')
  if (saved) {
    try {
      customAmounts.value = JSON.parse(saved)
    } catch (e) {
      console.error('Failed to load custom amounts:', e)
    }
  }
})

// 儲存自訂義容量
const saveCustomAmounts = () => {
  localStorage.setItem('customWaterAmounts', JSON.stringify(customAmounts.value))
}

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

  // 新增到自訂義容量列表（避免重複）
  if (!defaultQuickAmounts.includes(amount) && !customAmounts.value.includes(amount)) {
    customAmounts.value.push(amount)
    saveCustomAmounts()
  }

  emit('add-water', amount, `自定義 ${amount}ml`)

  // 清空輸入框
  customAmount.value = ''

  // 顯示成功回饋
  showSuccessMessage(`已新增 ${amount}ml`)
}

const removeCustomAmount = (amount) => {
  const index = customAmounts.value.indexOf(amount)
  if (index > -1) {
    customAmounts.value.splice(index, 1)
    saveCustomAmounts()
    showSuccessMessage(`已移除自訂義容量 ${amount}ml`)
  }
}

const handleReset = () => {
  emit('reset-today')
  showSuccessMessage('已重設今日記錄')
}

const showSuccessMessage = (message) => {
  // 這裡可以整合通知系統
  console.log('✅', message)
}

// 判斷是否為自訂義容量
const isCustomAmount = (amount) => {
  return customAmounts.value.includes(amount)
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


/* 自訂義容量按鈕樣式 */
.custom-amount {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.custom-amount:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b409f 100%);
}

.custom-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 4px;
  font-weight: bold;
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