import { defineStore } from 'pinia'
import { ref } from 'vue'

interface DrawStrawsResult {
  uuid: string
  uid: number
  tag: string
  name: string
}

export const useDrawStrawsListStore = defineStore(
  'darwStrawsList',
  () => {
    const drawStrawsList = ref<DrawStrawsResult[]>([])

    function addDrawStrawsResult(payload: DrawStrawsResult) {
      drawStrawsList.value.push(payload)
    }

    function getDrawStrawsResult(uuid: string, uid: number): DrawStrawsResult {
      const target = drawStrawsList.value.find((item) => item.uid == uid && item.uuid == uuid)
      return target ?? { uuid: '', uid: -1, name: '', tag: '' }
    }

    return {
      drawStrawsList,
      addDrawStrawsResult,
      getDrawStrawsResult
    }
  },
  {
    persist: { storage: localStorage }
  }
)
