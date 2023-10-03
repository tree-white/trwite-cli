import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDemoStore = defineStore(
  'demoStore',
  () => {
    const count = ref(0)

    const add = () => {
      count.value++
    }
    const sub = () => {
      count.value--
    }
    return { count, add, sub }
  },
  {
    persist: true,
  },
)
