import { NOTICE } from '@/constants/provieKey'
import { useCopy } from '@/hooks/useCopy'
import type { PoolListResult } from '@/interfaces/api'
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
  const { COPY, copy, copyText } = useCopy()
  function handleCopy() {
    copy(uuidWithType.value, () => setMessage('复制成功'))
  }

  const tableInfo = computed(() => {
    const tagTitle: Record<string, string> = {
      0: '签名',
      1: '签名',
      2: '小组ID',
      3: '小组ID',
      4: '次序'
    }

    const columns = [
      defineHeader('uid', 'UID'),
      defineHeader('name', '昵称'),
      defineHeader('tag', tagTitle[route.query.type as string])
    ]
    const list = (data.value as PoolListResult)?.list ?? []
    if (route.query.type === '3') {
      columns.push(defineHeader('role', '角色'))
      return {
        columns,
        data: list.map((item) => ({
          ...item,
          role: item.tag.split('$').slice(1).join('$'),
          tag: item.tag.split('$')[0]
        }))
      }
    }

    return {
      columns,
      data: list
    }
  })

  return () => (
    <t-pull-down-refresh
      v-model={refreshing.value}
      loading-bar-height={66}
      loading-texts={['下拉刷新', '松开刷新', '正在刷新', '刷新完成']}
      onRefresh={handleRefresh}
      class="flex flex-grow pt-4"
    >
      <div flex="~ col items-center gap-4">
        <t-progress
          class="grow"
          theme="circle"
          strokeWidth="15"
          color="#93b3ff"
          percentage={~~percentage.value}
        />
        <p>
          <span class="font-bold">总签数: {data.value?.total}</span>
          <span class="ml-4 font-bold">已抽人数: {data.value?.list?.length}</span>
        </p>
        <t-cell title={data.value?.title} description={uuidWithType.value}>
          <input class="absolute -top-100" ref={COPY} v-model={copyText.value} type="text" />
          <t-button theme="primary" size="extra-small" type="button" onClick={handleCopy}>
            复制口令
          </t-button>
        </t-cell>
        <t-table
          columns={tableInfo.value.columns}
          rowKey="uid"
          cellEmptyContent="-"
          data={tableInfo.value.data}
        />
      </div>
    </t-pull-down-refresh>
  )
})

function defineHeader(key: string, title: string) {
  return { colKey: key, title, ellipsis: true }
}
