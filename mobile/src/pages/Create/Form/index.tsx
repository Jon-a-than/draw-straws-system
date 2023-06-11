import { POOL_OPTION } from '@/constants/poolType'
import { NOTICE } from '@/constants/provieKey'
import { usePicker } from '@/hooks/usePicker'
import { createPool } from '@/services/drawStraws'
import { usePoolListStore } from '@/stores/poolList'
import { validateCreatePoolForm } from '@/validators/form'
import { useRequest } from 'alova'
import { defineComponent, inject, reactive } from 'vue'

import type { PickerContext } from 'tdesign-mobile-vue/es/picker'
import { useRouter } from 'vue-router'

interface FormData {
  title: string
  total: number
  type: string[]
  switch: boolean
  setup: { tag: string; limit: number }[]
}

export default defineComponent(() => {
  const formData = reactive<FormData>({
    title: '',
    total: 10,
    type: ['0'],
    switch: false,
    setup: [{ tag: '', limit: 10 }]
  })
  function addSetup() {
    formData.setup.push({ tag: '', limit: 10 })
  }
  function deleteSetup(index: number) {
    formData.setup.splice(index, 1)
  }

  const { pickerVisible, toggleVisible } = usePicker()
  const handlePick = (_: unknown, { index }: PickerContext) => {
    formData.type[0] = poolTypes[index].value
  }
  const poolTypes = [
    { label: '抽签模式', value: '0' },
    { label: '创建小组', value: '2' },
    { label: '队列排序', value: '4' }
  ]

  const router = useRouter()
  const poolListStore = usePoolListStore()
  const { data, error, send } = useRequest(createPool, { immediate: false })
  const { setMessage } = inject(NOTICE)!
  async function handleSubmit() {
    const payload = validateCreatePoolForm(formData)
    if (typeof payload == 'string') {
      return setMessage(payload, 'error')
    }

    await send(payload)
    if (error.value) {
      return setMessage(error.value.message, 'error')
    }

    setMessage('创建成功')
    const [uuid, type] = data.value.uuid.split('$')
    poolListStore.addPool({ uuid, type: +type, title: formData.title })
    await router.push({ name: 'PoolResult', query: { uuid, type: type } })
  }

  return () => (
    <>
      <div class="mb-4 overflow-y-auto">
        <t-form class="mt-[calc(50vh-300px)]" onSubmit={handleSubmit}>
          <t-form-item label="奖池名" name="title">
            <t-input v-model={formData.title} placeholder="请输入奖池名" />
          </t-form-item>
          <t-form-item label="总签数" name="total">
            <t-stepper min={1} max={200} size="large" v-model={formData.total} />
          </t-form-item>
          <t-form-item label="模式" name="type">
            <t-cell
              arrow
              bordered={false}
              title={poolTypes.filter(({ value }) => value == formData.type[0])[0].label}
              onClick={toggleVisible}
            />
          </t-form-item>
          <t-form-item v-show={formData.type[0] != '4'}>
            <t-cell bordered={false} title={POOL_OPTION[formData.type[0] as '0' | '2']}>
              {{ rightIcon: () => <t-switch v-model={formData.switch} size="small" /> }}
            </t-cell>
          </t-form-item>
          <t-form-item
            v-show={!formData.switch && formData.type[0] == '2'}
            label="成员数"
            name="limit"
          >
            <t-stepper min={1} max={200} size="large" v-model={formData.setup[0].limit} />
          </t-form-item>
          <t-collapse
            v-show={(formData.type[0] != '4' && formData.switch) || formData.type[0] != '2'}
            p="l-2 r-4"
          >
            {formData.setup.map((_, index) => (
              <t-collapse-panel
                value={index}
                key={index}
                header={() => (
                  <PickerHeader id={index} handleDelete={deleteSetup} handleAdd={addSetup} />
                )}
              >
                <t-form-item label="标签" name="tag">
                  <t-input v-model={formData.setup[index].tag} placeholder="请输入标签" />
                </t-form-item>
                <t-form-item label="数量" name="limit">
                  <t-stepper min={1} max={200} size="large" v-model={formData.setup[index].limit} />
                </t-form-item>
              </t-collapse-panel>
            ))}
          </t-collapse>

          <div pa-4>
            <t-button theme="primary" type="submit" block>
              发布奖池
            </t-button>
          </div>
        </t-form>
      </div>

      <t-popup v-model={pickerVisible.value} placement="bottom">
        <t-picker
          title="奖池模式"
          v-model={formData.type}
          columns={[poolTypes]}
          cancelBtn={false}
          confirmBtn={false}
          onPick={handlePick}
        />
      </t-popup>
    </>
  )
})

interface PickerHeaderProps {
  id: number
  handleAdd: () => void
  handleDelete: (index: number) => void
}
function PickerHeader({ id, handleAdd, handleDelete }: PickerHeaderProps) {
  function handleClick(e: MouseEvent) {
    e.stopPropagation()
    if (!id) handleAdd()
    else handleDelete(id)
  }

  return (
    <div class="flex items-center justify-between py-3">
      <span>奖项设置</span>
      <t-button type="button" size="small" variant="text" onClick={handleClick}>
        <i
          class={!id ? 'i-mingcute-add-fill' : 'i-material-symbols-delete-outline'}
          text={'2xl ' + (!id ? '#93b3ff' : 'red')}
        />
      </t-button>
    </div>
  )
}
