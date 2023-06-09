import { defineComponent, inject } from 'vue'
import { DRAW_STRAWS } from '../constants/keys'
import { RouterLink } from 'vue-router'

export default defineComponent({
  setup() {
    const { loading, data, error } = inject(DRAW_STRAWS)!
    console.log('loading', loading, 'data', data, 'error', error)

    return () =>
      loading.value ? <Loading /> : error.value ? <Error /> : <Success uuid={data.value.uuid} />
  }
})

function Loading() {
  return <div>loading...</div>
}

function Error() {
  return <div>error</div>
}

function Success({ uuid }: { uuid: string }) {
  return (
    <div>
      <RouterLink to={{ name: 'CreatePoolResult', query: { uuid } }}>创建成功，点击查看</RouterLink>
    </div>
  )
}
