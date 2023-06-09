import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useDrawStrawsResultStore = defineStore(
  'drawStrawsResult',
  () => {
    const drawStrawsResult = reactive<
      {
        title: string
        uid: number
        name: string
        tag: string
      }[]
    >([])

    return {
      drawStrawsResult
    }
  },
  { persist: { storage: window.localStorage } }
)
