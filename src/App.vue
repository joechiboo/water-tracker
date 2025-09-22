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
      <p>保持健康，記得多喝水！ 💪</p>
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
  text-align: center;
  padding: 2rem 1rem;
  margin-top: 3rem;
  background-color: #f8f9fa;
  color: #6c757d;
}

.app-footer p {
  margin: 0;
}
</style>