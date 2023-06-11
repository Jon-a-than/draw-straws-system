import { defineStore } from 'pinia'
import { ref } from 'vue'

interface PoolItem {
  title: string
  uuid: string
  type: number
}

export const usePoolListStore = defineStore(
  'poolList',
  () => {
    const poolList = ref<PoolItem[]>([])

    function addPool(payload: PoolItem) {
      if (poolList.value.find(({ uuid }) => uuid == payload.uuid)) return
      poolList.value.push(payload)
    }

    function deletePool(uuid: string) {
      const target = poolList.value.findIndex((item) => item.uuid == uuid)
      poolList.value.splice(target, 1)
    }

    return {
      addPool,
      poolList,
      deletePool
    }
  },
  {
    persist: { storage: localStorage }
  }
)
