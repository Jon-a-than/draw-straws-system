import { usePoolListStore } from '@/stores/poolList'
import { defineComponent, reactive } from 'vue'
import { usePicker } from '@/hooks/usePicker'
import { useNotice } from '@/hooks/useNotice'
import { useRequest } from 'alova'

import { createPool } from '@/services/drawStraws'

import type { PickerContext } from 'tdesign-mobile-vue/es/picker'
import type { CreatePoolPayload } from '@/interfaces/api'

interface FormData {
  title: string
  total: number
  type: string[]
  setup: { tag: string; limit: number }[]
}

export default defineComponent(() => {
  const formData = reactive<FormData>({
    title: '',
    total: 10,
    type: ['0'],
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

  const poolListStore = usePoolListStore()
  const { data, error, send } = useRequest(createPool, { immediate: false })
  const { visible, setVisible, type, message, setMessage } = useNotice()
  async function handleSubmit() {
    const validateRes = validateFormDate(formData)
    if ('message' in validateRes) {
      return setMessage(validateRes.message, 'error')
    }

    await send(validateRes.payload)
    if (error.value) {
      return setMessage(error.value.message, 'error')
    }

    setMessage('创建成功')
    const [uuid, type] = data.value.uuid.split('$')
    poolListStore.addPool(uuid, +type)
  }

  return () => (
    <>
      <t-notice-bar visible={visible.value} theme={type.value} content={message.value}>
        {{ suffixIcon: () => <i i-ic-round-close onClick={() => setVisible()} /> }}
      </t-notice-bar>
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
        <t-collapse v-show={formData.type[0] != '4'} pl-2 pr-4>
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
    <div class="py-3 flex items-center justify-between">
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

function validateFormDate(
  formData: FormData
): { message: string } | { payload: CreatePoolPayload } {
  if (!formData.title) return { message: '奖池名不能为空' }
  const type = +formData.type[0]
  if (type != 4) {
    if (formData.setup.some(({ tag }) => !tag)) return { message: '标签不能为空' }
    if (formData.total > formData.setup.reduce((pre, { limit }) => pre + limit, 0))
      return { message: '设置的签数少于总签数' }
  }

  return {
    payload: {
      ...formData,
      type,
      setup: type != 4 ? formData.setup : []
    }
  }
}
