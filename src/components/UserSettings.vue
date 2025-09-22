<template>
  <div class="settings-modal-overlay" @click="$emit('close')">
    <div class="settings-content" @click.stop>
      <button class="settings-close" @click="$emit('close')">✕</button>

      <div class="settings-header">
        <h2>🌟 選擇你的水分戰士類型 🌟</h2>
        <p>每個戰士都有獨特的能力和目標！</p>
      </div>

      <!-- 已選擇的戰士（縮小顯示） -->
      <div v-if="selectedWarrior" class="selected-warrior-mini">
        <div class="mini-warrior-content">
          <span class="mini-icon">{{ selectedWarrior.icon }}</span>
          <span class="mini-name">{{ selectedWarrior.name }}</span>
          <span class="mini-goal">目標：{{ selectedWarrior.defaultGoal }}ml</span>
          <button @click="selectedWarrior = null" class="change-warrior-btn">
            變更戰士
          </button>
        </div>
      </div>

      <!-- 戰士選擇卡片 -->
      <div v-if="!selectedWarrior" class="warrior-selection">
        <div
          v-for="warrior in warriors"
          :key="warrior.id"
          @click="selectWarrior(warrior)"
          class="warrior-card"
          <div class="warrior-icon">{{ warrior.icon }}</div>
          <div class="warrior-name">{{ warrior.name }}</div>
          <div class="warrior-title">{{ warrior.title }}</div>
          <div class="warrior-goal">目標：{{ warrior.defaultGoal }}ml</div>
          <div class="warrior-power">
            <strong>特殊能力：</strong>{{ warrior.power }}
          </div>
          <div class="warrior-desc">{{ warrior.description }}</div>
        </div>
      </div>

      <!-- 自訂目標區域（選擇戰士後顯示） -->
      <div v-if="selectedWarrior" class="custom-goal-section" :class="{ 'show': selectedWarrior }">
        <h3>🎯 自訂你的每日目標</h3>
        <div class="goal-input-container">
          <input
            v-model.number="customGoal"
            type="number"
            min="200"
            max="5000"
            step="50"
            class="goal-input"
            placeholder="輸入目標 (ml)"
          >
          <span class="goal-unit">ml</span>
        </div>

        <div class="goal-suggestions">
          <h4>💡 快速選擇</h4>
          <div class="goal-buttons">
            <button
              v-for="suggestion in goalSuggestions"
              :key="suggestion"
              @click="customGoal = suggestion"
              class="goal-btn"
              :class="{ 'active': customGoal === suggestion }"
            >
              {{ suggestion }}ml
            </button>
          </div>
        </div>

        <div class="motivation-message">
          <div v-if="customGoal < 1000" class="motivation gentle">
            🌱 溫柔開始，每一滴都是進步！
          </div>
          <div v-else-if="customGoal < 2000" class="motivation moderate">
            💪 很好的目標，保持這個節奏！
          </div>
          <div v-else-if="customGoal < 3000" class="motivation strong">
            🔥 雄心勃勃！你是真正的水分戰士！
          </div>
          <div v-else class="motivation legendary">
            🏆 傳說級目標！你是水分界的超級英雄！
          </div>
        </div>
      </div>

      <div class="settings-actions">
        <button @click="saveSettings" class="save-btn" :disabled="!selectedWarrior">
          🚀 開始我的水分冒險！
        </button>
        <button @click="$emit('close')" class="cancel-btn">
          稍後再說
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'

const emit = defineEmits(['close', 'settings-saved'])

const { getItem, setItem } = useLocalStorage()

// 響應式資料
const selectedWarrior = ref(null)
const customGoal = ref(2000)

// 水分戰士類型
const warriors = [
  {
    id: 'beginner',
    name: '新手冒險者',
    icon: '🌱',
    title: '溫柔起步',
    defaultGoal: 1200,
    power: '每一小步都能獲得雙倍鼓勵',
    description: '剛開始的水分之旅，從小目標開始建立信心！'
  },
  {
    id: 'explorer',
    name: '水分探索家',
    icon: '🗺️',
    title: '穩健前進',
    defaultGoal: 2000,
    power: '解鎖多樣化水分來源',
    description: '平衡的飲水習慣，探索各種有趣的水分選擇！'
  },
  {
    id: 'master',
    name: '水分大師',
    icon: '💎',
    title: '專業級別',
    defaultGoal: 3000,
    power: '獲得專屬成就徽章',
    description: '水分管理專家，追求完美的水合狀態！'
  }
]

// 目標建議
const goalSuggestions = [800, 1200, 1500, 2000, 2500, 3000]

// 方法
const selectWarrior = (warrior) => {
  selectedWarrior.value = warrior
  customGoal.value = warrior.defaultGoal
}

const saveSettings = () => {
  if (!selectedWarrior.value) return

  const settings = {
    warriorType: selectedWarrior.value.id,
    warriorName: selectedWarrior.value.name,
    dailyGoal: customGoal.value,
    setupDate: new Date().toISOString()
  }

  setItem('userSettings', settings)

  emit('settings-saved', {
    goal: customGoal.value,
    warrior: selectedWarrior.value
  })

  emit('close')
}

// 載入現有設定
onMounted(() => {
  const existingSettings = getItem('userSettings')
  if (existingSettings) {
    const warrior = warriors.find(w => w.id === existingSettings.warriorType)
    if (warrior) {
      selectedWarrior.value = warrior
      customGoal.value = existingSettings.dailyGoal
    }
  }
})
</script>

<style scoped>
.settings-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
  overflow-y: auto;
  padding: 1rem;
}

.settings-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2rem;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s ease;
  color: white;
}

.settings-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.settings-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.settings-header {
  text-align: center;
  margin-bottom: 2rem;
}

.settings-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  background: linear-gradient(45deg, #fff, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.settings-header p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

/* 已選擇的戰士（縮小顯示） */
.selected-warrior-mini {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 255, 255, 0.2));
  border: 2px solid #ffd700;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 2rem;
  animation: slideDown 0.4s ease;
}

.mini-warrior-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.mini-icon {
  font-size: 2rem;
}

.mini-name {
  font-size: 1.2rem;
  font-weight: bold;
  flex: 1;
}

.mini-goal {
  font-size: 1rem;
  color: #ffd700;
  font-weight: 600;
}

.change-warrior-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.change-warrior-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.warrior-selection {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  animation: fadeIn 0.4s ease;
}

.warrior-card {
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  backdrop-filter: blur(10px);
}

.warrior-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.warrior-icon {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
}

.warrior-name {
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
}

.warrior-title {
  text-align: center;
  opacity: 0.8;
  font-style: italic;
  margin-bottom: 1rem;
}

.warrior-goal {
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffd700;
}

.warrior-power {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.warrior-desc {
  font-size: 0.85rem;
  opacity: 0.9;
  line-height: 1.4;
}

.custom-goal-section {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.custom-goal-section h3 {
  margin: 0 0 1rem 0;
  text-align: center;
}

.goal-input-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.goal-input {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 0.8rem 1rem;
  color: white;
  font-size: 1.2rem;
  text-align: center;
  width: 200px;
}

.goal-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.goal-input:focus {
  outline: none;
  border-color: #ffd700;
}

.goal-unit {
  font-size: 1.2rem;
  font-weight: bold;
}

.goal-suggestions h4 {
  margin: 0 0 1rem 0;
  text-align: center;
}

.goal-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;
}

.goal-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.goal-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.goal-btn.active {
  background: #ffd700;
  color: #333;
  border-color: #ffd700;
}

.motivation-message {
  margin-top: 1.5rem;
  text-align: center;
  padding: 1rem;
  border-radius: 10px;
  font-weight: 500;
}

.motivation.gentle {
  background: rgba(76, 175, 80, 0.3);
}

.motivation.moderate {
  background: rgba(33, 150, 243, 0.3);
}

.motivation.strong {
  background: rgba(255, 152, 0, 0.3);
}

.motivation.legendary {
  background: rgba(156, 39, 176, 0.3);
}

.settings-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.save-btn {
  background: linear-gradient(45deg, #4CAF50, #45a049);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.save-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
}

.save-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cancel-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 動畫 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* 響應式設計 */
@media (max-width: 1024px) and (min-width: 769px) {
  .warrior-selection {
    gap: 1rem;
  }

  .warrior-card {
    padding: 1.2rem;
  }
}

@media (max-width: 768px) {
  .settings-content {
    padding: 1.5rem;
    margin: 0.5rem;
  }

  .selected-warrior-mini .mini-warrior-content {
    flex-direction: column;
    text-align: center;
  }

  .warrior-selection {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .goal-buttons {
    gap: 0.5rem;
  }

  .goal-btn {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }

  .settings-actions {
    flex-direction: column;
  }

  .save-btn, .cancel-btn {
    width: 100%;
  }
}
</style>