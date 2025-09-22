<template>
  <div class="help-modal-overlay" @click="$emit('close')">
    <div class="help-content" @click.stop>
      <button class="help-close" @click="$emit('close')">✕</button>

      <div class="help-header">
        <h2>💧 幫助中心</h2>
        <p>選擇你想了解的內容</p>
      </div>

      <!-- 選項卡片 -->
      <div class="help-cards">
        <div
          @click="activeSection = 'knowledge'"
          class="help-card"
          :class="{ 'active': activeSection === 'knowledge' }"
        >
          <div class="card-icon">💡</div>
          <div class="card-title">飲水小知識</div>
          <div class="card-desc">了解飲水的好處與技巧</div>
        </div>

        <div
          @click="activeSection = 'containers'"
          class="help-card"
          :class="{ 'active': activeSection === 'containers' }"
        >
          <div class="card-icon">🍵</div>
          <div class="card-title">常見容器</div>
          <div class="card-desc">快速記錄常用容量</div>
        </div>

        <div
          @click="activeSection = 'tips'"
          class="help-card"
          :class="{ 'active': activeSection === 'tips' }"
        >
          <div class="card-icon">🎯</div>
          <div class="card-title">使用技巧</div>
          <div class="card-desc">如何更好地追蹤飲水</div>
        </div>
      </div>

      <!-- 內容區域 -->
      <div v-if="activeSection" class="help-detail">
        <!-- 飲水知識 -->
        <div v-if="activeSection === 'knowledge'" class="detail-content">
          <h3>💡 飲水小知識</h3>

          <div class="knowledge-tabs">
            <button
              v-for="tab in knowledgeTabs"
              :key="tab.id"
              @click="activeKnowledgeTab = tab.id"
              class="tab-btn"
              :class="{ 'active': activeKnowledgeTab === tab.id }"
            >
              {{ tab.title }}
            </button>
          </div>

          <div class="tab-content">
            <!-- 溫和建議 -->
            <div v-if="activeKnowledgeTab === 'gentle'" class="content-panel">
              <div class="advice-grid">
                <div class="advice-item">
                  <span class="advice-icon">🌟</span>
                  <div>
                    <h5>從小目標開始</h5>
                    <p>不用急著喝到2000ml！先從每天1杯水開始。</p>
                  </div>
                </div>
                <div class="advice-item">
                  <span class="advice-icon">💝</span>
                  <div>
                    <h5>每一步都值得慶祝</h5>
                    <p>今天比昨天多喝一點點？太棒了！</p>
                  </div>
                </div>
                <div class="advice-item">
                  <span class="advice-icon">🎯</span>
                  <div>
                    <h5>找到適合你的節奏</h5>
                    <p>跟著感覺走就對了！</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 有趣選擇 -->
            <div v-if="activeKnowledgeTab === 'alternatives'" class="content-panel">
              <div class="alternatives-grid">
                <div class="alt-category">
                  <h5>🌿 天然調味水</h5>
                  <p>檸檬水、黃瓜水、莓果水、薄荷水</p>
                </div>
                <div class="alt-category">
                  <h5>🍵 溫暖選擇</h5>
                  <p>綠茶、花茶、溫開水、蜂蜜水</p>
                </div>
                <div class="alt-category">
                  <h5>🥣 含水食物</h5>
                  <p>清湯、西瓜、小黃瓜、柑橘類</p>
                </div>
                <div class="alt-category">
                  <h5>💧 氣泡系列</h5>
                  <p>氣泡水、檸檬氣泡水</p>
                </div>
              </div>
            </div>

            <!-- 好處 -->
            <div v-if="activeKnowledgeTab === 'benefits'" class="content-panel">
              <div class="benefits-grid">
                <div class="benefit-item">
                  <span>🧠</span>
                  <p>提升腦力</p>
                </div>
                <div class="benefit-item">
                  <span>💪</span>
                  <p>增強體力</p>
                </div>
                <div class="benefit-item">
                  <span>✨</span>
                  <p>美容養顏</p>
                </div>
                <div class="benefit-item">
                  <span>❤️</span>
                  <p>心血管健康</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 常見容器 -->
        <div v-if="activeSection === 'containers'" class="detail-content">
          <h3>🍵 常見容器參考</h3>
          <p class="subtitle">點擊直接新增對應容量</p>

          <div class="container-grid">
            <div
              v-for="container in containers"
              :key="container.name"
              @click="handleAddWater(container)"
              class="container-item"
            >
              <div class="container-icon">{{ container.icon }}</div>
              <div class="container-name">{{ container.name }}</div>
              <div class="container-volume">{{ container.volume }}ml</div>
              <div class="container-suggestion">{{ container.suggestion }}</div>
            </div>
          </div>
        </div>

        <!-- 使用技巧 -->
        <div v-if="activeSection === 'tips'" class="detail-content">
          <h3>🎯 使用技巧</h3>
          <div class="tips-list">
            <div class="tip-item">
              <span class="tip-number">1</span>
              <div>
                <h5>設定適合自己的目標</h5>
                <p>從小目標開始，慢慢增加，不要給自己太大壓力。</p>
              </div>
            </div>
            <div class="tip-item">
              <span class="tip-number">2</span>
              <div>
                <h5>利用常見容器快速記錄</h5>
                <p>點擊容器圖標就能快速新增，省時又方便。</p>
              </div>
            </div>
            <div class="tip-item">
              <span class="tip-number">3</span>
              <div>
                <h5>把喝水變成習慣</h5>
                <p>起床一杯、餐前一杯，固定時間更容易記得。</p>
              </div>
            </div>
            <div class="tip-item">
              <span class="tip-number">4</span>
              <div>
                <h5>找到喜歡的口味</h5>
                <p>加點檸檬、薄荷，或喝茶都算數，讓喝水變有趣！</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'add-water'])

// 響應式資料
const activeSection = ref('knowledge')
const activeKnowledgeTab = ref('gentle')

// 知識分頁
const knowledgeTabs = [
  { id: 'gentle', title: '💚 新手友善' },
  { id: 'alternatives', title: '🍋 有趣選擇' },
  { id: 'benefits', title: '✨ 好處' }
]

// 容器資料
const containers = [
  {
    name: '小水杯',
    volume: 200,
    icon: '🥛',
    suggestion: '輕鬆開始的好選擇'
  },
  {
    name: '馬克杯',
    volume: 250,
    icon: '☕',
    suggestion: '上班族最愛'
  },
  {
    name: '小瓶水',
    volume: 330,
    icon: '🧊',
    suggestion: '便利商店常見'
  },
  {
    name: '中瓶水',
    volume: 500,
    icon: '💧',
    suggestion: '剛剛好的份量'
  },
  {
    name: '寶特瓶',
    volume: 600,
    icon: '🫧',
    suggestion: '外出攜帶方便'
  },
  {
    name: '大水瓶',
    volume: 1000,
    icon: '🧴',
    suggestion: '一瓶就很厲害了'
  }
]

// 方法
const handleAddWater = (container) => {
  emit('add-water', container.volume, container.name)
  emit('close')
}
</script>

<style scoped>
.help-modal-overlay {
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

.help-content {
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-radius: 20px;
  padding: 2rem;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s ease;
  color: white;
}

.help-close {
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

.help-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.help-header {
  text-align: center;
  margin-bottom: 2rem;
}

.help-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}

.help-header p {
  margin: 0;
  opacity: 0.9;
}

.help-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.help-card {
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  backdrop-filter: blur(10px);
}

.help-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.help-card.active {
  border-color: #ffd700;
  background: rgba(255, 215, 0, 0.2);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card-desc {
  font-size: 0.9rem;
  opacity: 0.9;
}

.help-detail {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
}

.detail-content h3 {
  margin: 0 0 1rem 0;
  text-align: center;
}

.subtitle {
  text-align: center;
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

/* 知識標籤 */
.knowledge-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.tab-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.tab-btn.active {
  background: #ffd700;
  color: #333;
  border-color: #ffd700;
}

/* 建議格子 */
.advice-grid {
  display: grid;
  gap: 1rem;
}

.advice-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.advice-icon {
  font-size: 2rem;
}

.advice-item h5 {
  margin: 0 0 0.5rem 0;
  color: #ffd700;
}

.advice-item p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

/* 替代品格子 */
.alternatives-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.alt-category {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
}

.alt-category h5 {
  margin: 0 0 0.5rem 0;
  color: #ffd700;
}

.alt-category p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

/* 好處格子 */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.benefit-item {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.benefit-item span {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

.benefit-item p {
  margin: 0;
  font-size: 0.9rem;
}

/* 容器格子 */
.container-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.container-item {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.container-item:hover {
  transform: translateY(-3px);
  border-color: #ffd700;
  background: rgba(255, 215, 0, 0.2);
}

.container-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.container-name {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.container-volume {
  color: #ffd700;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.container-suggestion {
  font-size: 0.8rem;
  opacity: 0.8;
}

/* 使用技巧 */
.tips-list {
  display: grid;
  gap: 1rem;
}

.tip-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.tip-number {
  background: #ffd700;
  color: #333;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.tip-item h5 {
  margin: 0 0 0.5rem 0;
  color: #ffd700;
}

.tip-item p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
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

/* 響應式設計 */
@media (max-width: 768px) {
  .help-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .alternatives-grid,
  .container-grid {
    grid-template-columns: 1fr;
  }

  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>