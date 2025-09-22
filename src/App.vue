<template>
  <div id="app">
    <header class="app-header">
      <h1>💧 Water Tracker</h1>
      <p>每日飲水追蹤器</p>
    </header>

    <main class="app-main">
      <!-- 知識科普區域 -->
      <KnowledgeSection />

      <!-- 容器參考區域 -->
      <ContainerRef @add-water="addWater" />

      <!-- 進度追蹤區域 -->
      <WaterProgress :progress="progress" />

      <!-- 快速操作區域 -->
      <QuickAdd @add-water="addWater" />
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
            <img src="/linePay.png" alt="LINE Pay 贊助" class="linepay-qr">
            <p class="linepay-text">LINE Pay 贊助</p>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 Water Tracker | 用愛與程式碼製作 💙</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWaterTracker } from './composables/useWaterTracker'
import KnowledgeSection from './components/KnowledgeSection.vue'
import ContainerRef from './components/ContainerRef.vue'
import WaterProgress from './components/WaterProgress.vue'
import QuickAdd from './components/QuickAdd.vue'

const { progress, addWater, loadTodayData } = useWaterTracker()

// 頁面載入時讀取當日資料
onMounted(() => {
  loadTodayData()
})
</script>

<style scoped>
.app-header {
  text-align: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  margin-bottom: 2rem;
}

.app-header h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 600;
}

.app-header p {
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
  font-size: 1.1rem;
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

@media (max-width: 768px) {
  .footer-content {
    padding: 2rem 1rem;
    gap: 1.5rem;
  }

  .linepay-qr {
    width: 100px;
    height: 100px;
  }
}
</style>