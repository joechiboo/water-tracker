# Water Tracker - 技術架構文檔

## 🛠️ 技術選型

### 前端技術
- **Vue 3**：現代響應式框架，組件化開發
- **HTML5**：語義化標籤，支援離線應用
- **CSS3**：響應式設計、動畫效果
- **Vite**：快速開發工具和打包器

### 資料存儲
- **LocalStorage**：瀏覽器本地儲存
  - 優點：無需伺服器、資料持久化、快速存取
  - 適用：個人使用、簡單資料結構
  - 容量：約 5-10MB，足夠使用

### 部署方案
- **GitHub Pages**：免費靜態網站託管
- **Vite 打包**：建構最佳化的靜態檔案
- **自動部署**：透過 GitHub Actions 實現 CI/CD
- **自定義域名**：支援設定自己的網域 (可選)

## 📊 資料結構設計

### LocalStorage 資料格式

```javascript
// 用戶設定
userSettings = {
  name: "使用者名稱",
  userType: 1, // 1: 極少飲水型, 2: 輕度飲水型, 3: 適度飲水型
  dailyGoal: 2000, // 每日目標 (ml)
  weight: 60, // 體重 (kg)
  createdAt: "2024-01-01"
}

// 每日記錄
dailyRecords = {
  "2024-01-01": {
    date: "2024-01-01",
    totalAmount: 1500, // 當日總飲水量 (ml)
    records: [
      { time: "09:00", amount: 250, container: "馬克杯" },
      { time: "11:30", amount: 500, container: "保溫瓶" },
      { time: "14:00", amount: 250, container: "馬克杯" },
      { time: "16:30", amount: 500, container: "保溫瓶" }
    ],
    goalAchieved: false
  }
}

// 容器預設
containerPresets = [
  { name: "馬克杯", volume: 250 },
  { name: "保溫瓶", volume: 500 },
  { name: "寶特瓶", volume: 600 },
  { name: "大水瓶", volume: 1000 }
]
```

## 🏗️ 文件架構

```
water-tracker/
├── index.html              # 入口頁面
├── package.json            # 專案依賴
├── vite.config.js          # Vite 設定
├── src/
│   ├── main.js             # Vue 應用入口
│   ├── App.vue             # 根組件
│   ├── components/         # Vue 組件
│   │   ├── WaterProgress.vue    # 進度顯示
│   │   ├── QuickAdd.vue         # 快速累加
│   │   ├── ContainerRef.vue     # 容器參考
│   │   └── KnowledgeSection.vue # 知識科普
│   ├── composables/        # Vue 組合式 API
│   │   ├── useWaterTracker.js   # 飲水追蹤邏輯
│   │   └── useLocalStorage.js   # 本地儲存
│   ├── assets/             # 靜態資源
│   │   ├── styles/         # CSS 檔案
│   │   └── images/         # 圖片資源
│   └── utils/              # 工具函數
│       └── helpers.js      # 通用函數
├── docs/                   # 文檔
└── README.md
```

## ⚡ 核心功能實作

### 1. Vue Composable - 飲水追蹤
```javascript
// src/composables/useWaterTracker.js
import { ref, computed } from 'vue'
import { useLocalStorage } from './useLocalStorage'

export function useWaterTracker() {
  const { getItem, setItem } = useLocalStorage()

  // 響應式資料
  const currentAmount = ref(0)
  const dailyGoal = ref(2000)
  const todayRecords = ref([])

  // 計算屬性
  const progress = computed(() => ({
    current: currentAmount.value,
    goal: dailyGoal.value,
    percentage: Math.min((currentAmount.value / dailyGoal.value) * 100, 100),
    remaining: Math.max(dailyGoal.value - currentAmount.value, 0)
  }))

  // 新增飲水記錄
  const addWater = (amount, container = '自定義') => {
    const record = {
      time: new Date().toLocaleTimeString(),
      amount,
      container
    }

    todayRecords.value.push(record)
    currentAmount.value += amount
    saveTodayData()
  }

  // 儲存當日資料
  const saveTodayData = () => {
    const today = new Date().toISOString().split('T')[0]
    const dailyData = getItem('dailyRecords') || {}

    dailyData[today] = {
      date: today,
      totalAmount: currentAmount.value,
      records: todayRecords.value,
      goalAchieved: currentAmount.value >= dailyGoal.value
    }

    setItem('dailyRecords', dailyData)
  }

  // 載入當日資料
  const loadTodayData = () => {
    const today = new Date().toISOString().split('T')[0]
    const dailyData = getItem('dailyRecords') || {}

    if (dailyData[today]) {
      currentAmount.value = dailyData[today].totalAmount
      todayRecords.value = dailyData[today].records
    }
  }

  return {
    currentAmount,
    dailyGoal,
    todayRecords,
    progress,
    addWater,
    loadTodayData
  }
}
```

### 2. LocalStorage Composable
```javascript
// src/composables/useLocalStorage.js
export function useLocalStorage() {
  const getItem = (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('LocalStorage getItem error:', error)
      return null
    }
  }

  const setItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('LocalStorage setItem error:', error)
    }
  }

  return { getItem, setItem }
}
```

### 3. 離線支援
- 使用 Service Worker 實現基本離線功能
- 所有資料本地儲存，無需網路連接

## 🎯 開發里程碑

### Phase 1: 基礎功能 (MVP)
- [ ] Vue 專案初始化
- [ ] 基本組件架構
- [ ] LocalStorage 資料操作
- [ ] 累加記錄功能
- [ ] 進度顯示
- [ ] GitHub Pages 部署設定

### Phase 2: 進階功能
- [ ] 知識科普區域
- [ ] 容器參考選擇
- [ ] 用戶設定頁面
- [ ] 歷史記錄查看
- [ ] 響應式設計

### Phase 3: 優化完善
- [ ] 動畫效果優化
- [ ] PWA 功能 (離線支援)
- [ ] 效能優化
- [ ] 自動部署流程 (GitHub Actions)

## 📱 瀏覽器支援

- **現代瀏覽器**：Chrome, Firefox, Safari, Edge
- **LocalStorage 支援**：IE8+ 以上
- **響應式設計**：支援各種螢幕尺寸

---

## 🚀 GitHub Pages 部署配置

### Vite 設定
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/water-tracker/', // GitHub repository 名稱
  build: {
    outDir: 'dist'
  }
})
```

### 部署腳本
```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && git subtree push --prefix dist origin gh-pages"
  }
}
```

### 手動部署步驟
1. `npm run build` - 建構專案
2. 推送 `dist` 資料夾到 `gh-pages` 分支
3. 在 GitHub repository 設定中啟用 GitHub Pages
4. 選擇 `gh-pages` 分支作為來源

### 自動部署 (GitHub Actions)
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

*這個架構簡潔高效，適合快速開發和部署。*