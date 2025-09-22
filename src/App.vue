<template>
  <div id="app">
    <header class="app-header">
      <div class="header-content">
        <div class="header-text">
          <h1>💧 Water Tracker</h1>
          <p>每日飲水追蹤器</p>
          <div v-if="userSettings" class="user-info">
            {{ userSettings.warriorName }} | 目標：{{ userSettings.dailyGoal }}ml
          </div>
        </div>
        <div class="header-buttons">
          <button @click="showHelp = true" class="header-btn help-btn" title="幫助中心">
            ❓
          </button>
          <button @click="showSettings = true" class="header-btn settings-btn" title="設定">
            ⚙️
          </button>
        </div>
      </div>
    </header>

    <main class="app-main">
      <!-- 進度追蹤區域 -->
      <WaterProgress :progress="progress" />

      <!-- 快速操作區域 -->
      <QuickAdd @add-water="addWater" @reset-today="resetToday" />
    </main>

    <footer class="app-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>💧 關於 Water Tracker</h4>
          <p>專為不愛喝水的人設計，零壓力的飲水追蹤體驗</p>
          <p>讓喝水變得簡單有趣，從一杯開始！</p>
        </div>

        <div class="footer-section">
          <h4>👨‍💻 關於作者</h4>
          <p>全端工程師，專注於使用者體驗設計</p>
          <a href="https://joechiboo.github.io/" target="_blank" class="portfolio-link">
            🔗 查看作品集
          </a>
        </div>

        <div class="footer-section support-section">
          <h4>☕ 支持作者</h4>
          <p>如果這個工具對你有幫助，歡迎請我喝杯咖啡！</p>
          <div class="linepay-container">
            <img
              src="/linePay.png"
              alt="LINE Pay 贊助"
              class="linepay-qr"
              @click="showLinePayModal = true"
              title="點擊放大"
            >
            <p class="linepay-text">LINE Pay 贊助（點擊放大）</p>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 Water Tracker | 用愛與程式碼製作 💙</p>
      </div>
    </footer>

    <!-- LINE Pay 放大模態框 -->
    <div v-if="showLinePayModal" class="modal-overlay" @click="showLinePayModal = false">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="showLinePayModal = false">✕</button>
        <h3>LINE Pay 贊助</h3>
        <img src="/linePay.png" alt="LINE Pay QR Code" class="modal-qr">
        <p>掃描 QR Code 即可贊助</p>
        <p class="modal-tip">謝謝你的支持！💙</p>
      </div>
    </div>

    <!-- 用戶設定模態框 -->
    <UserSettings
      v-if="showSettings"
      @close="showSettings = false"
      @settings-saved="handleSettingsSaved"
    />

    <!-- 幫助中心模態框 -->
    <HelpCenter
      v-if="showHelp"
      @close="showHelp = false"
      @add-water="addWater"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useWaterTracker } from './composables/useWaterTracker'
import { useLocalStorage } from './composables/useLocalStorage'
import WaterProgress from './components/WaterProgress.vue'
import QuickAdd from './components/QuickAdd.vue'
import UserSettings from './components/UserSettings.vue'
import HelpCenter from './components/HelpCenter.vue'

const { progress, addWater, loadTodayData, setDailyGoal, resetToday } = useWaterTracker()
const { getItem } = useLocalStorage()

// 響應式資料
const showLinePayModal = ref(false)
const showSettings = ref(false)
const showHelp = ref(false)
const userSettings = ref(null)

// 處理設定保存
const handleSettingsSaved = (data) => {
  setDailyGoal(data.goal)
  userSettings.value = {
    warriorName: data.warrior.name,
    dailyGoal: data.goal
  }
}

// 頁面載入時讀取當日資料和用戶設定
onMounted(() => {
  loadTodayData()

  // 載入用戶設定
  const settings = getItem('userSettings')
  if (settings) {
    userSettings.value = {
      warriorName: settings.warriorName,
      dailyGoal: settings.dailyGoal
    }
  } else {
    // 首次使用，顯示設定
    showSettings.value = true
  }
})
</script>

<style scoped>
.app-header {
  padding: 1rem 1rem;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  margin-bottom: 1rem;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-text {
  text-align: left;
}

.app-header h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.app-header p {
  margin: 0.25rem 0 0 0;
  opacity: 0.9;
  font-size: 1rem;
}

.user-info {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-block;
}

.header-buttons {
  display: flex;
  gap: 1rem;
}

.header-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.6rem;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.help-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.settings-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg) scale(1.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.app-main {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.app-footer {
  margin-top: 3rem;
  background: linear-gradient(135deg, #2980b9, #3498db);
  color: white;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 2rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section h4 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ecf0f1;
}

.footer-section p {
  margin: 0 0 0.75rem 0;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
}

.portfolio-link {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.portfolio-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.support-section {
  text-align: center;
}

.linepay-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.linepay-qr {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.linepay-qr:hover {
  transform: scale(1.05);
}

.linepay-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.footer-bottom {
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

/* 模態框樣式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
  text-align: center;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #f0f0f0;
  color: #333;
}

.modal-content h3 {
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
}

.modal-qr {
  width: 280px;
  height: 280px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 1.5rem;
}

.modal-content p {
  color: #666;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.modal-tip {
  color: #3498db;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 1rem;
}

/* 動畫效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .header-text {
    text-align: center;
  }

  .app-header h1 {
    font-size: 1.5rem;
  }

  .app-header p {
    font-size: 0.9rem;
  }

  .header-buttons {
    gap: 0.5rem;
  }

  .header-btn {
    min-width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .footer-content {
    padding: 2rem 1rem;
    gap: 1.5rem;
  }

  .linepay-qr {
    width: 100px;
    height: 100px;
  }

  .modal-qr {
    width: 240px;
    height: 240px;
  }

  .modal-content {
    padding: 1.5rem;
  }
}
</style>