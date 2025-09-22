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
          <!-- 溫和建議 -->
          <div v-if="activeTab === 'gentle'" class="content-panel">
            <h4>💚 給不愛喝水朋友的溫和建議</h4>
            <div class="gentle-advice">
              <div class="advice-card">
                <div class="advice-icon">🌟</div>
                <div class="advice-content">
                  <h5>從小目標開始</h5>
                  <p>不用急著喝到2000ml！先從每天1杯水開始，慢慢增加就好。</p>
                </div>
              </div>

              <div class="advice-card">
                <div class="advice-icon">💝</div>
                <div class="advice-content">
                  <h5>每一步都值得慶祝</h5>
                  <p>今天比昨天多喝一點點？太棒了！小進步也是大勝利。</p>
                </div>
              </div>

              <div class="advice-card">
                <div class="advice-icon">🎯</div>
                <div class="advice-content">
                  <h5>找到適合你的節奏</h5>
                  <p>有些人早上喝得多，有些人下午才開始。跟著感覺走就對了！</p>
                </div>
              </div>

              <div class="advice-card">
                <div class="advice-icon">🤝</div>
                <div class="advice-content">
                  <h5>別給自己壓力</h5>
                  <p>偶爾忘記喝水沒關係！明天再來就好，這不是考試。</p>
                </div>
              </div>
            </div>

            <div class="encouragement">
              <p><strong>💙 記住：沒有完美的標準，只有適合你的節奏！</strong></p>
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

          <!-- 有趣選擇 -->
          <div v-if="activeTab === 'alternatives'" class="content-panel">
            <h4>🍋 讓飲水變有趣的選擇</h4>
            <div class="alternatives-grid">
              <div class="alt-category">
                <h5>🌿 天然調味水</h5>
                <div class="alt-items">
                  <div class="alt-item">🍋 檸檬水 - 清香提神</div>
                  <div class="alt-item">🥒 黃瓜水 - 清爽解膩</div>
                  <div class="alt-item">🍓 莓果水 - 酸甜可口</div>
                  <div class="alt-item">🌿 薄荷水 - 涼爽舒緩</div>
                </div>
              </div>

              <div class="alt-category">
                <h5>🍵 溫暖選擇</h5>
                <div class="alt-items">
                  <div class="alt-item">🍵 綠茶 - 淡淡茶香</div>
                  <div class="alt-item">🌸 花茶 - 療癒香氣</div>
                  <div class="alt-item">🥛 溫開水 - 暖胃舒適</div>
                  <div class="alt-item">🍯 蜂蜜水 - 天然甜味</div>
                </div>
              </div>

              <div class="alt-category">
                <h5>🥣 含水食物</h5>
                <div class="alt-items">
                  <div class="alt-item">🍲 清湯 - 營養又補水</div>
                  <div class="alt-item">🍉 西瓜 - 水分豐富</div>
                  <div class="alt-item">🥒 小黃瓜 - 爽脆多水</div>
                  <div class="alt-item">🍊 柑橘類 - 維C加水</div>
                </div>
              </div>

              <div class="alt-category">
                <h5>💧 氣泡系列</h5>
                <div class="alt-items">
                  <div class="alt-item">🫧 氣泡水 - 有趣口感</div>
                  <div class="alt-item">🍋 檸檬氣泡水 - 清爽刺激</div>
                  <div class="alt-item">🫧 無糖汽水 - 偶爾選擇</div>
                </div>
              </div>
            </div>

            <div class="alt-tip">
              <p><strong>💡 小提醒：</strong>所有含水的東西都算數！找到你喜歡的就是最好的開始。</p>
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
const isExpanded = ref(false) // 預設折疊
const activeTab = ref('gentle')
const weight = ref('')
const activity = ref('medium')

// 分頁資料
const tabs = [
  { id: 'gentle', title: '💚 新手友善' },
  { id: 'alternatives', title: '🍋 有趣選擇' },
  { id: 'benefits', title: '✨ 好處' },
  { id: 'timing', title: '⏰ 時機' }
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

/* 新增樣式 */
.gentle-advice {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.advice-card {
  display: flex;
  align-items: flex-start;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f0f8ff, #e8f5e8);
  border-radius: 12px;
  border-left: 4px solid #27ae60;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.advice-icon {
  font-size: 2rem;
  margin-right: 1rem;
  margin-top: 0.25rem;
}

.advice-content h5 {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.advice-content p {
  color: #555;
  margin: 0;
  line-height: 1.5;
  font-size: 0.9rem;
}

.encouragement {
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
  border-radius: 12px;
  border: 2px solid #3498db;
}

.encouragement p {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.alternatives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.alt-category {
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.alt-category h5 {
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.alt-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.alt-item {
  padding: 0.5rem 0.75rem;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 6px;
  font-size: 0.9rem;
  color: #2c3e50;
  border-left: 3px solid #3498db;
}

.alt-tip {
  background: linear-gradient(135deg, #fff3cd, #d4edda);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
  text-align: center;
}

.alt-tip p {
  margin: 0;
  color: #856404;
  font-size: 0.95rem;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .info-grid,
  .benefits-grid,
  .gentle-advice,
  .alternatives-grid {
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

  .advice-card {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }

  .advice-icon {
    margin: 0 0 0.5rem 0;
  }
}
</style>