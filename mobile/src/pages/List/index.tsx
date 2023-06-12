import { POOL_TYPE } from '@/constants/poolType'
import { NOTICE } from '@/constants/provieKey'
import { getPoolList } from '@/services/drawStraws'
import { useDrawStrawsListStore } from '@/stores/drawStrawsList'
import { usePoolListStore } from '@/stores/poolList'
import { isUUIDWithType } from '@/validators/form'
import { useRequest } from 'alova'
import { storeToRefs } from 'pinia'
import { defineComponent, inject, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent(() => {
  const uuidWithType = ref<string>('')

  const poolListStore = usePoolListStore()
  const { poolList } = storeToRefs(poolListStore)
  const drawStrawsListStore = useDrawStrawsListStore()
  const { drawStrawsList } = storeToRefs(drawStrawsListStore)

  const { setMessage } = inject(NOTICE)!
  const { data, error, send } = useRequest(getPoolList, { immediate: false })
  async function handleSubmit() {
    if (!isUUIDWithType(uuidWithType.value)) {
      return setMessage('口令错误', 'error')
    }

    const [uuid, type] = uuidWithType.value.split('$')
    await send({ uuid })
    if (error.value || data.value?.error) {
      return setMessage(error.value?.message ?? '' + data.value?.error, 'error')
    }

    poolListStore.addPool({ uuid, type: +type, title: data.value.title })
  }

  const router = useRouter()
  async function handlePoolClick(uuid: string, type: number) {
    await router.push({ name: 'PoolResult', query: { uuid, type } })
  }
  async function handleDrawStrawsClick(uuid: string, uid: number) {
    await router.push({ name: 'DrawStrawsInfo', query: { uuid, uid } })
  }

  return () => (
    <div mb-4 overflow-y-auto>
      <t-form onSubmit={handleSubmit} mt-8>
        <t-form-item label="奖池口令" name="uuid">
          <t-input v-model={uuidWithType.value} placeholder="请输出奖池口令" />
        </t-form-item>
        <div pa-4>
          <t-button theme="primary" type="submit" block>
            查看奖池
          </t-button>
        </div>
      </t-form>

      <t-cell-group v-show={poolList.value.length} title="已创建的奖池">
        {poolList.value.map(({ type, uuid, title }) => (
          <t-swipe-cell
            key={uuid}
            left={() => <SwipeCellDelete onDelete={() => poolListStore.deletePool(uuid)} />}
          >
            <t-cell
              arrow
              hover
              title={title}
              description={POOL_TYPE[type]}
              onClick={() => handlePoolClick(uuid, type)}
            />
          </t-swipe-cell>
        ))}
      </t-cell-group>

      <t-cell-group v-show={drawStrawsList.value.length} title="抽签记录">
        {drawStrawsList.value.map(({ uuid, uid, title, name, role, tag }) => (
          <t-swipe-cell
            key={uuid + uid}
            left={() => (
              <SwipeCellDelete
                onDelete={() => drawStrawsListStore.deleteDrawStrawsItem(uuid, uid)}
              />
            )}
          >
            <t-cell
              hover
              title={title}
              description={name}
              onClick={() => handleDrawStrawsClick(uuid, uid)}
            >
              {tag} {role && `(${role})`}
            </t-cell>
          </t-swipe-cell>
        ))}
      </t-cell-group>
    </div>
  )
})

function SwipeCellDelete({ onDelete }: { onDelete: () => void }) {
  return (
    <div class="flex items-center bg-red px-4 font-bold text-white" onClick={onDelete}>
      删除
    </div>
  )
}
