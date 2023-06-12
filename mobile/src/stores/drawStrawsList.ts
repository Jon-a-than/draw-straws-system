import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { DrawStrawsResult } from '@/interfaces/api'

interface DrawStrawsItem extends DrawStrawsResult {
  uuid: string
  type: number
}

export const useDrawStrawsListStore = defineStore(
  'darwStrawsList',
  () => {
    const drawStrawsList = ref<DrawStrawsItem[]>([])

    function addDrawStrawsItem(payload: DrawStrawsItem) {
      drawStrawsList.value.push(payload)
    }

    function getDrawStrawsItem(uuid: string, uid: number): DrawStrawsItem {
      const target = drawStrawsList.value.find((item) => item.uid == uid && item.uuid == uuid)
      return target ?? { uuid: '', uid: -1, name: '', tag: '', type: -1, title: '' }
    }

    function deleteDrawStrawsItem(uuid: string, uid: number) {
      const target = drawStrawsList.value.findIndex((item) => item.uid == uid && item.uuid == uuid)
      drawStrawsList.value.splice(target, 1)
    }

    return {
      drawStrawsList,
      addDrawStrawsItem,
      getDrawStrawsItem,
      deleteDrawStrawsItem
    }
  },
  {
    persist: { storage: localStorage }
  }
)
