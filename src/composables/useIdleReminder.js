import { ref, onMounted, onUnmounted } from 'vue'

export function useIdleReminder(options = {}) {
  const {
    lightIdleThreshold = 2 * 60 * 60 * 1000, // 輕度提醒：2 小時（毫秒）
    severeIdleThreshold = 4 * 60 * 60 * 1000, // 強烈提醒：4 小時（毫秒）
    onIdleStart = () => {},
    onIdleEnd = () => {}
  } = options

  const idleLevel = ref(0) // 0: 正常, 1: 輕度閒置, 2: 嚴重閒置
  const lastActivityTime = ref(Date.now())
  let idleCheckInterval = null
  let faviconInterval = null
  let titleInterval = null
  let originalTitle = ''
  let originalFavicon = ''

  // 更新最後活動時間
  const updateActivity = () => {
    lastActivityTime.value = Date.now()
    if (idleLevel.value > 0) {
      stopIdleEffects()
    }
  }

  // 檢查是否閒置
  const checkIdle = () => {
    const now = Date.now()
    const idleTime = now - lastActivityTime.value

    if (idleTime >= severeIdleThreshold && idleLevel.value !== 2) {
      // 嚴重閒置（4小時）
      startIdleEffects(2)
    } else if (idleTime >= lightIdleThreshold && idleLevel.value === 0) {
      // 輕度閒置（2小時）
      startIdleEffects(1)
    }
  }

  // 開始閒置效果
  const startIdleEffects = (level) => {
    // 如果等級相同，不重複啟動
    if (idleLevel.value === level) return

    // 先清除舊效果
    stopIdleEffects()

    idleLevel.value = level
    onIdleStart()

    // 標題閃爍效果
    originalTitle = document.title
    let showWarning = true
    const warningMessages = {
      1: '💧 該喝水了！',
      2: '🚨 你很渴了！快喝水！'
    }
    const intervals = {
      1: 2000, // 輕度：2秒切換
      2: 800   // 嚴重：0.8秒切換（更緊急）
    }

    titleInterval = setInterval(() => {
      document.title = showWarning ? warningMessages[level] : originalTitle
      showWarning = !showWarning
    }, intervals[level])

    // Favicon 跳動效果
    startFaviconAnimation(level)

    // 只有嚴重閒置才加頁面搖晃
    if (level === 2) {
      document.body.classList.add('idle-shake')
    }
  }

  // 停止閒置效果
  const stopIdleEffects = () => {
    idleLevel.value = 0
    onIdleEnd()

    // 移除頁面搖晃
    document.body.classList.remove('idle-shake')

    // 恢復標題
    if (titleInterval) {
      clearInterval(titleInterval)
      titleInterval = null
    }
    if (originalTitle) {
      document.title = originalTitle
    }

    // 停止 Favicon 動畫
    stopFaviconAnimation()
  }

  // Favicon 動畫（根據等級調整強度）
  const startFaviconAnimation = (level) => {
    const favicon = document.querySelector('link[rel="icon"][type="image/svg+xml"]')
    if (favicon) {
      originalFavicon = favicon.href

      // 根據等級設定動畫參數
      const animationParams = {
        1: { maxScale: 1.2, speed: 300, color: '#3498db' },      // 輕度：輕微跳動
        2: { maxScale: 1.5, speed: 150, color: '#e74c3c' }       // 嚴重：劇烈跳動 + 紅色
      }
      const params = animationParams[level]

      let scale = 1
      let growing = false
      faviconInterval = setInterval(() => {
        scale = growing ? scale + 0.1 : scale - 0.1
        if (scale >= params.maxScale) growing = false
        if (scale <= 1) growing = true

        // 創建動態 SVG - 美化的水滴形狀
        const dropY = 50 + (params.maxScale - scale) * 25
        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:${params.color};stop-opacity:0.9" />
                <stop offset="50%" style="stop-color:${params.color};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${params.color === '#e74c3c' ? '#c0392b' : '#2980b9'};stop-opacity:1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <radialGradient id="highlight">
                <stop offset="0%" style="stop-color:white;stop-opacity:0.5" />
                <stop offset="100%" style="stop-color:white;stop-opacity:0" />
              </radialGradient>
            </defs>
            <g transform="translate(50, ${dropY}) scale(${scale})">
              <!-- 水滴主體 -->
              <path d="M 0,-32 C -12,-32 -22,-20 -24,-5 C -25,8 -18,22 -10,28 C -5,32 0,35 0,35 C 0,35 5,32 10,28 C 18,22 25,8 24,-5 C 22,-20 12,-32 0,-32 Z"
                    fill="url(#waterGrad)"
                    filter="url(#glow)"/>
              <!-- 高光效果 -->
              <ellipse cx="-7" cy="-12" rx="8" ry="10" fill="url(#highlight)" opacity="0.7"/>
              <ellipse cx="-10" cy="-18" rx="4" ry="5" fill="white" opacity="0.4"/>
            </g>
          </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        favicon.href = url
      }, params.speed)
    }
  }

  const stopFaviconAnimation = () => {
    if (faviconInterval) {
      clearInterval(faviconInterval)
      faviconInterval = null
    }
    if (originalFavicon) {
      const favicon = document.querySelector('link[rel="icon"][type="image/svg+xml"]')
      if (favicon) {
        favicon.href = originalFavicon
      }
    }
  }

  // 初始化
  onMounted(() => {
    // 每分鐘檢查一次閒置狀態
    idleCheckInterval = setInterval(checkIdle, 60 * 1000)
  })

  // 清理
  onUnmounted(() => {
    if (idleCheckInterval) {
      clearInterval(idleCheckInterval)
    }
    stopIdleEffects()
  })

  // 手動觸發提醒（用於測試）
  const manualTrigger = () => {
    if (idleLevel.value === 0) {
      // 從正常 -> 輕度
      startIdleEffects(1)
    } else if (idleLevel.value === 1) {
      // 從輕度 -> 嚴重
      startIdleEffects(2)
    } else {
      // 從嚴重 -> 正常
      stopIdleEffects()
    }
  }

  return {
    idleLevel,
    updateActivity,
    lastActivityTime,
    manualTrigger
  }
}
