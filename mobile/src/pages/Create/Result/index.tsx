import { computed, defineComponent } from 'vue'
import { useDrawStrawsListStore } from '@/stores/drawStrawsList'
import { useRoute } from 'vue-router'

export default defineComponent(() => {
  const { getDrawStrawsResult } = useDrawStrawsListStore()
  const route = useRoute()
  const drawStrawsResult = computed(() => {
    const { query } = route
    return getDrawStrawsResult(query?.uuid as string, query?.uid as unknown as number)
  })

  return () => (
    <>
      <h1>Result</h1>
      <p>{drawStrawsResult.value}</p>
    </>
  )
})
