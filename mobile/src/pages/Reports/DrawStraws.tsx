import { NOTICE } from '@/constants/provieKey'
import { useCopy } from '@/hooks/useCopy'
import { useDrawStrawsListStore } from '@/stores/drawStrawsList'
import { defineComponent, inject } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent(() => {
  const drawStrawsListStore = useDrawStrawsListStore()
  const route = useRoute()

  const drawStrawsInfo = drawStrawsListStore.getDrawStrawsItem(
    route.query.uuid as string,
    +(route.query.uid as string)
  )

  const { setMessage } = inject(NOTICE)!
  const { COPY, copyText, copy } = useCopy()
  function handleCopy() {
    copy(`${drawStrawsInfo.uuid}$${drawStrawsInfo.type}`, () => setMessage('复制成功'))
  }

  const TAG_TITLE: Record<number, string> = {
    0: '签名',
    1: '签名',
    2: '小组ID',
    3: '小组ID',
    4: '次序'
  }

  return () => (
    <t-cell-group mt-8>
      <t-cell title={drawStrawsInfo.title} description={drawStrawsInfo.uuid}>
        <input class="absolute -top-100" ref={COPY} v-model={copyText.value} type="text" />
        <t-button theme="primary" size="extra-small" type="button" onClick={handleCopy}>
          复制口令
        </t-button>
      </t-cell>
      <t-cell
        title={drawStrawsInfo.name}
        description={'uid: ' + drawStrawsInfo.uid}
        note={drawStrawsInfo?.role ?? ''}
      />
      <t-cell title={TAG_TITLE[drawStrawsInfo.type]}>{drawStrawsInfo.tag}</t-cell>
    </t-cell-group>
  )
})
