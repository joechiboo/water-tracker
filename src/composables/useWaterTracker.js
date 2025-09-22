import { ref, computed } from 'vue'
import { useLocalStorage } from './useLocalStorage'

export function useWaterTracker() {
  const { getItem, setItem } = useLocalStorage()

  // 響應式資料
  const currentAmount = ref(0)
  const dailyGoal = ref(2000) // 標準目標
  const todayRecords = ref([])

  // 計算屬性
  const progress = computed(() => ({
    current: currentAmount.value,
    goal: dailyGoal.value,
    percentage: Math.min((currentAmount.value / dailyGoal.value) * 100, 100),
    remaining: Math.max(dailyGoal.value - currentAmount.value, 0),
    achieved: currentAmount.value >= dailyGoal.value
  }))

  // 新增飲水記錄
  const addWater = (amount, container = '自定義') => {
    const record = {
      time: new Date().toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      amount,
      container
    }

    todayRecords.value.push(record)
    currentAmount.value += amount
    saveTodayData()

    // 達成目標時的慶祝效果
    if (progress.value.achieved && currentAmount.value - amount < dailyGoal.value) {
      triggerCelebration()
    }
  }

  // 重設當日記錄
  const resetToday = () => {
    currentAmount.value = 0
    todayRecords.value = []
    saveTodayData()
  }

  // 儲存當日資料
  const saveTodayData = () => {
    const today = new Date().toISOString().split('T')[0]
    const dailyData = getItem('dailyRecords') || {}

    dailyData[today] = {
      date: today,
      totalAmount: currentAmount.value,
      records: [...todayRecords.value],
      goalAchieved: progress.value.achieved,
      lastUpdated: new Date().toISOString()
    }

    setItem('dailyRecords', dailyData)
  }

  // 載入當日資料
  const loadTodayData = () => {
    const today = new Date().toISOString().split('T')[0]
    const dailyData = getItem('dailyRecords') || {}
    const userSettings = getItem('userSettings')

    // 載入用戶設定
    if (userSettings && userSettings.dailyGoal) {
      dailyGoal.value = userSettings.dailyGoal
    }

    // 載入當日記錄
    if (dailyData[today]) {
      currentAmount.value = dailyData[today].totalAmount || 0
      todayRecords.value = dailyData[today].records || []
    } else {
      // 新的一天，重設資料
      currentAmount.value = 0
      todayRecords.value = []
    }
  }

  // 設定每日目標
  const setDailyGoal = (newGoal) => {
    dailyGoal.value = newGoal
    const userSettings = getItem('userSettings') || {}
    userSettings.dailyGoal = newGoal
    setItem('userSettings', userSettings)
    saveTodayData()
  }

  // 獲取歷史記錄
  const getHistoryData = (days = 7) => {
    const dailyData = getItem('dailyRecords') || {}
    const history = []

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]

      history.push({
        date: dateStr,
        data: dailyData[dateStr] || {
          date: dateStr,
          totalAmount: 0,
          records: [],
          goalAchieved: false
        }
      })
    }

    return history
  }

  // 慶祝動畫觸發
  const triggerCelebration = () => {
    // 可以在這裡加入更複雜的慶祝邏輯
    console.log('🎉 恭喜達成今日飲水目標！')
  }

  return {
    // 資料
    currentAmount,
    dailyGoal,
    todayRecords,

    // 計算屬性
    progress,

    // 方法
    addWater,
    resetToday,
    loadTodayData,
    setDailyGoal,
    getHistoryData
  }
}