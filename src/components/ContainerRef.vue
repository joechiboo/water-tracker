<template>
  <div class="container-ref card">
    <h3>常見容器參考</h3>
    <p class="subtitle">點擊直接新增對應容量</p>

    <div class="container-grid">
      <div
        v-for="container in containers"
        :key="container.name"
        @click="handleContainerAdd(container)"
        class="container-item"
        :class="{ 'bounce': animatingContainer === container.name }"
      >
        <div class="container-icon">
          {{ container.icon }}
        </div>
        <div class="container-info">
          <div class="container-name">{{ container.name }}</div>
          <div class="container-volume">{{ container.volume }}ml</div>
          <div class="container-suggestion" v-if="container.suggestion">
            {{ container.suggestion }}
          </div>
        </div>
      </div>
    </div>

    <div class="tips">
      <h4>💡 小貼士</h4>
      <ul>
        <li>一般成人每日建議飲水量：2000-2500ml</li>
        <li>運動後需要額外補充水分</li>
        <li>分次飲用比一次大量飲用更有效</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-water'])

// 容器資料
const containers = [
  {
    name: '馬克杯',
    volume: 250,
    icon: '☕',
    suggestion: '約需8杯達成目標'
  },
  {
    name: '保溫瓶',
    volume: 500,
    icon: '🍼',
    suggestion: '約需4瓶達成目標'
  },
  {
    name: '寶特瓶',
    volume: 600,
    icon: '🍼',
    suggestion: '約需3-4瓶達成目標'
  },
  {
    name: '大水瓶',
    volume: 1000,
    icon: '🧴',
    suggestion: '約需2瓶達成目標'
  },
  {
    name: '小水杯',
    volume: 200,
    icon: '🥛',
    suggestion: '適合少量多次'
  },
  {
    name: '運動水壺',
    volume: 750,
    icon: '⚽',
    suggestion: '運動時使用'
  }
]

// 響應式資料
const animatingContainer = ref(null)

// 方法
const handleContainerAdd = (container) => {
  emit('add-water', container.volume, container.name)

  // 觸發動畫
  animatingContainer.value = container.name
  setTimeout(() => {
    animatingContainer.value = null
  }, 600)

  // 顯示回饋訊息
  showSuccessMessage(`已新增 ${container.name} (${container.volume}ml)`)
}

const showSuccessMessage = (message) => {
  console.log('✅', message)
}
</script>

<style scoped>
.container-ref h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  color: #6c757d;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.container-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.container-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
}

.container-item:hover {
  border-color: #3498db;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
}

.container-item:active {
  transform: translateY(0);
}

.container-icon {
  font-size: 2rem;
  margin-right: 1rem;
  min-width: 40px;
  text-align: center;
}

.container-info {
  flex: 1;
}

.container-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.container-volume {
  font-size: 1.1rem;
  color: #3498db;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.container-suggestion {
  font-size: 0.8rem;
  color: #6c757d;
  font-style: italic;
}

.tips {
  background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #3498db;
}

.tips h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.tips ul {
  margin: 0;
  padding-left: 1.5rem;
}

.tips li {
  color: #555;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.tips li:last-child {
  margin-bottom: 0;
}

/* 動畫效果 */
.bounce {
  animation: bounce 0.6s ease-in-out;
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

/* 響應式設計 */
@media (max-width: 768px) {
  .container-grid {
    grid-template-columns: 1fr;
  }

  .container-item {
    padding: 0.75rem;
  }

  .container-icon {
    font-size: 1.5rem;
    margin-right: 0.75rem;
    min-width: 30px;
  }

  .tips {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .container-item {
    flex-direction: column;
    text-align: center;
    padding: 1rem 0.5rem;
  }

  .container-icon {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}
</style>