import { NOTICE } from '@/constants/provieKey'
import { getPoolList } from '@/services/drawStraws'
import { useRequest } from 'alova'
import { computed, defineComponent, inject, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent(() => {
  const route = useRoute()
  const { data, send } = useRequest(
    getPoolList({
      uuid: route.query.uuid as string
    })
  )

  const percentage = computed(() => {
    return ((data.value?.list?.length ?? 0) / (data.value?.total ?? 0)) * 100
  })

  const refreshing = ref(false)
  async function handleRefresh() {
    await send({ uuid: route.query.uuid as string })
    refreshing.value = false
  }

  const uuidWithType = computed(() => `${route.query.uuid}$${route.query.type}`)

  const { setMessage } = inject(NOTICE)!
  const COPY = ref<HTMLInputElement>()
  function handleCopy() {
    COPY.value?.select()
    document.execCommand('copy')
    setMessage('复制成功')
  }

  return () => (
    <t-pull-down-refresh
      v-model={refreshing.value}
      loading-bar-height={66}
      loading-texts={['下拉刷新', '松开刷新', '正在刷新', '刷新完成']}
      onRefresh={handleRefresh}
      class="flex flex-grow pt-4"
    >
      <div flex="~ col items-center gap-4">
        <h2 class="pl-4 text-center text-2xl font-bold">{data.value?.title}</h2>
        <t-progress
          class="grow"
          theme="circle"
          strokeWidth="15"
          color="#93b3ff"
          percentage={percentage.value}
        />
        <p>
          <span class="font-bold">总签数: {data.value?.total}</span>
          <span class="ml-4 font-bold">已抽人数: {data.value?.list?.length}</span>
        </p>
        <p flex="~ items-center">
          <span>
            口令: <strong>{`${route.query.uuid}$${route.query.type}`}</strong>
          </span>
          <t-button theme="primary" size="extra-small" type="button" onClick={handleCopy}>
            复制
          </t-button>
          <input ref={COPY} v-model={uuidWithType.value} class="absolute -top-100" type="text" />
        </p>
        <t-table
          columns={[
            { colKey: 'name', title: '昵称', ellipsis: true },
            { colKey: 'tag', title: '标签', ellipsis: true },
            { colKey: 'role', title: '角色', ellipsis: true }
          ]}
          rowKey="uid"
          cellEmptyContent="-"
          data={data.value?.list ?? []}
        />
      </div>
    </t-pull-down-refresh>
  )
})
