import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

// 创建 pinia 示例
const pinia = createPinia()

/**
 * 创建自定义持久化工具
 * 由于Uniapp的存储方式是支持多端的，在移动端小程序等平台是没有windows对象可以存储localStorage的
 * 这里默认开启自动化存储，如果不需要持久化存储只需要在"defineStore"的时候加上"{persist:false}"即可
 */
const persistence = createPersistedState({
  auto: true,
  storage: {
    getItem: (key) => uni.getStorageSync(key),
    setItem: (key, value) => uni.setStorageSync(key, value),
  },
})

// 使用持久化插件
pinia.use(persistence)

// 默认导出给 main.ts 使用
export default pinia

// 默认把所有模块从"index"导出，实现中心化管理
export * from './modules/useDemoStore'
