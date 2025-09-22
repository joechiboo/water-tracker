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
      return true
    } catch (error) {
      console.error('LocalStorage setItem error:', error)
      return false
    }
  }

  const removeItem = (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('LocalStorage removeItem error:', error)
      return false
    }
  }

  const clear = () => {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('LocalStorage clear error:', error)
      return false
    }
  }

  // 檢查 LocalStorage 是否可用
  const isAvailable = () => {
    try {
      const test = '__localStorage_test__'
      localStorage.setItem(test, 'test')
      localStorage.removeItem(test)
      return true
    } catch (error) {
      return false
    }
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
    isAvailable
  }
}