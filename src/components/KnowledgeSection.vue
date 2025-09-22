<template>
  <div class="knowledge-section card">
    <div class="section-header" @click="toggleExpanded">
      <h3>
        💡 飲水小知識
        <span class="toggle-icon" :class="{ 'expanded': isExpanded }">▼</span>
      </h3>
    </div>

    <transition name="slide-fade">
      <div v-show="isExpanded" class="knowledge-content">
        <div class="knowledge-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="tab-btn"
            :class="{ 'active': activeTab === tab.id }"
          >
            {{ tab.title }}
          </button>
        </div>

        <div class="tab-content">
          <!-- 基本建議 -->
          <div v-if="activeTab === 'basic'" class="content-panel">
            <h4>每日飲水建議</h4>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-icon">👨‍💼</div>
                <div class="info-text">
                  <strong>一般成人</strong><br>
                  2000-2500ml/天
                </div>
              </div>
              <div class="info-item">
                <div class="info-icon">🏃‍♂️</div>
                <div class="info-text">
                  <strong>運動時</strong><br>
                  額外增加 500-1000ml
                </div>
              </div>
              <div class="info-item">
                <div class="info-icon">🌡️</div>
                <div class="info-text">
                  <strong>炎熱天氣</strong><br>
                  增加 300-500ml
                </div>
              </div>
              <div class="info-item">
                <div class="info-icon">🤱</div>
                <div class="info-text">
                  <strong>孕婦/哺乳</strong><br>
                  2700-3800ml/天
                </div>
              </div>
            </div>
          </div>

          <!-- 飲水時機 -->
          <div v-if="activeTab === 'timing'" class="content-panel">
            <h4>最佳飲水時機</h4>
            <div class="timing-list">
              <div class="timing-item">
                <div class="time">🌅 起床後</div>
                <div class="desc">300-500ml，補充夜間流失水分</div>
              </div>
              <div class="timing-item">
                <div class="time">🍽️ 餐前30分鐘</div>
                <div class="desc">200-300ml，幫助消化</div>
              </div>
              <div class="timing-item">
                <div class="time">💼 工作間隙</div>
                <div class="desc">每小時 100-200ml，維持專注力</div>
              </div>
              <div class="timing-item">
                <div class="time">🏃‍♂️ 運動前後</div>
                <div class="desc">運動前500ml，運動後適量補充</div>
              </div>
              <div class="timing-item">
                <div class="time">🌙 睡前1小時</div>
                <div class="desc">100-200ml，避免夜間頻尿</div>
              </div>
            </div>
          </div>

          <!-- 健康益處 -->
          <div v-if="activeTab === 'benefits'" class="content-panel">
            <h4>充足飲水的好處</h4>
            <div class="benefits-grid">
              <div class="benefit-item">
                <div class="benefit-icon">🧠</div>
                <div class="benefit-title">提升腦力</div>
                <div class="benefit-desc">改善專注力和記憶力</div>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">💪</div>
                <div class="benefit-title">增強體力</div>
                <div class="benefit-desc">維持肌肉功能和耐力</div>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">✨</div>
                <div class="benefit-title">美容養顏</div>
                <div class="benefit-desc">保持皮膚水潤有光澤</div>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">🏥</div>
                <div class="benefit-title">促進代謝</div>
                <div class="benefit-desc">幫助排毒和新陳代謝</div>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">❤️</div>
                <div class="benefit-title">心血管健康</div>
                <div class="benefit-desc">維持血液循環順暢</div>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">🦴</div>
                <div class="benefit-title">關節保護</div>
                <div class="benefit-desc">潤滑關節，減少僵硬</div>
              </div>
            </div>
          </div>

          <!-- 計算工具 -->
          <div v-if="activeTab === 'calculator'" class="content-panel">
            <h4>個人化飲水量計算</h4>
            <div class="calculator">
              <div class="calc-input">
                <label>您的體重 (kg)：</label>
                <input
                  v-model.number="weight"
                  type="number"
                  min="30"
                  max="200"
                  placeholder="請輸入體重"
                >
              </div>
              <div class="calc-input">
                <label>活動量：</label>
                <select v-model="activity">
                  <option value="low">輕度 (久坐辦公)</option>
                  <option value="medium">中度 (適量運動)</option>
                  <option value="high">高度 (大量運動)</option>
                </select>
              </div>
              <div class="calc-result" v-if="calculatedAmount">
                <strong>建議每日飲水量：{{ calculatedAmount }}ml</strong>
                <p class="calc-note">
                  * 此為基本建議，實際需求可能因環境和健康狀況而異
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 響應式資料
const isExpanded = ref(false)
const activeTab = ref('basic')
const weight = ref('')
const activity = ref('medium')

// 分頁資料
const tabs = [
  { id: 'basic', title: '基本建議' },
  { id: 'timing', title: '飲水時機' },
  { id: 'benefits', title: '健康益處' },
  { id: 'calculator', title: '計算工具' }
]

// 計算屬性
const calculatedAmount = computed(() => {
  if (!weight.value || weight.value < 30) return null

  const baseAmount = weight.value * 35 // 基礎：每公斤體重35ml

  const activityMultiplier = {
    low: 1,
    medium: 1.2,
    high: 1.5
  }

  const result = Math.round(baseAmount * activityMultiplier[activity.value])
  return Math.min(Math.max(result, 1500), 4000) // 限制在合理範圍內
})

// 方法
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.section-header {
  cursor: pointer;
  user-select: none;
}

.section-header h3 {
  color: #2c3e50;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.toggle-icon {
  transition: transform 0.3s ease;
  color: #3498db;
  font-size: 0.8rem;
}

.toggle-icon.expanded {
  transform: rotate(180deg);
}

.knowledge-content {
  border-top: 1px solid #e9ecef;
  padding-top: 1.5rem;
  margin-top: 1rem;
}

.knowledge-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

.tab-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-size: 0.9rem;
}

.tab-btn:hover {
  border-color: #3498db;
}

.tab-btn.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.content-panel h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.info-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.info-text {
  font-size: 0.9rem;
  line-height: 1.4;
}

.timing-list {
  space-y: 1rem;
}

.timing-item {
  display: flex;
  padding: 1rem;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border-radius: 8px;
  border-left: 4px solid #27ae60;
  margin-bottom: 0.75rem;
}

.time {
  font-weight: bold;
  color: #2c3e50;
  min-width: 140px;
  font-size: 0.9rem;
}

.desc {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.4;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.benefit-item {
  text-align: center;
  padding: 1rem;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.benefit-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.benefit-title {
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.benefit-desc {
  color: #6c757d;
  font-size: 0.8rem;
  line-height: 1.3;
}

.calculator {
  background: linear-gradient(135deg, #e8f5e8, #f0f8ff);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #d4edda;
}

.calc-input {
  margin-bottom: 1rem;
}

.calc-input label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.calc-input input,
.calc-input select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
}

.calc-result {
  margin-top: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  text-align: center;
  color: #27ae60;
  font-size: 1.1rem;
}

.calc-note {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #6c757d;
  font-style: italic;
}

/* 動畫效果 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .info-grid,
  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .knowledge-tabs {
    flex-wrap: wrap;
  }

  .timing-item {
    flex-direction: column;
    gap: 0.5rem;
  }

  .time {
    min-width: auto;
  }
}
</style>