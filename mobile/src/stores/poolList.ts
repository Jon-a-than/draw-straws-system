import { defineStore } from 'pinia'
import { ref } from 'vue'

interface PoolItem {
  uuid: string
  type: number
}

export const usePoolListStore = defineStore(
  'poolList',
  () => {
    const poolList = ref<PoolItem[]>([])

    function addPool(uuid: string, type: number) {
      poolList.value.push({ uuid, type })
    }

    return {
      addPool,
      poolList
    }
  },
  {
    persist: { storage: localStorage }
  }
)
