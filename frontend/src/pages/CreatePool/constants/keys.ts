import type { SendHandler } from 'alova'
import type { InjectionKey, Ref } from 'vue'

export const DRAW_STRAWS = Symbol('draw-straws') as InjectionKey<{
  loading: Ref<boolean>
  data: Ref<{ uuid: string }>
  error: Ref<Error | undefined>
  send: SendHandler<Record<string, string>>
}>
