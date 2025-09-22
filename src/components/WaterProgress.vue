<template>
  <div class="water-progress card">
    <h2>今日進度</h2>

    <div class="progress-display">
      <div class="current-amount">
        <span class="amount">{{ progress.current }}</span>
        <span class="unit">ml</span>
      </div>

      <div class="goal-info">
        <span>目標：{{ progress.goal }}ml</span>
        <span class="percentage" :class="{ 'achieved': progress.achieved }">
          {{ Math.round(progress.percentage) }}%
        </span>
      </div>
    </div>

    <div class="progress-bar">
      <div
        class="progress-fill"
        :style="{ width: progress.percentage + '%' }"
        :class="{ 'achieved': progress.achieved }"
      ></div>
    </div>

    <div class="remaining-info" v-if="!progress.achieved">
      <p>再加 <strong>{{ progress.remaining }}ml</strong> 就更棒了！💪</p>
    </div>

    <div class="achievement-message" v-else>
      <p>🎉 太厲害了！你做得很好！</p>
    </div>

    <div class="water-visual">
      <div class="water-bottle">
        <div
          class="water-level"
          :style="{ height: Math.min(progress.percentage, 100) + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  progress: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.water-progress {
  text-align: center;
}

.water-progress h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.progress-display {
  margin-bottom: 2rem;
}

.current-amount {
  font-size: 3rem;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.current-amount .unit {
  font-size: 1.5rem;
  color: #7f8c8d;
  margin-left: 0.5rem;
}

.goal-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  color: #6c757d;
}

.percentage {
  font-weight: bold;
  color: #3498db;
}

.percentage.achieved {
  color: #27ae60;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #ecf0f1;
  border-radius: 10px;
  overflow: hidden;
  margin: 1.5rem 0;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2980b9);
  border-radius: 10px;
  transition: width 0.5s ease-in-out;
  position: relative;
}

.progress-fill.achieved {
  background: linear-gradient(90deg, #27ae60, #229954);
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.remaining-info {
  color: #7f8c8d;
  font-size: 1rem;
}

.achievement-message {
  color: #27ae60;
  font-size: 1.1rem;
  font-weight: bold;
  animation: bounce 0.6s;
}

.water-visual {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.water-bottle {
  width: 60px;
  height: 120px;
  border: 3px solid #3498db;
  border-radius: 0 0 20px 20px;
  position: relative;
  background-color: #f8f9fa;
  overflow: hidden;
}

.water-level {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, #3498db, #2980b9);
  transition: height 0.8s ease-in-out;
  border-radius: 0 0 17px 17px;
}

.water-bottle::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 15px;
  background-color: #3498db;
  border-radius: 3px 3px 0 0;
}

@media (max-width: 768px) {
  .current-amount {
    font-size: 2.5rem;
  }

  .goal-info {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>