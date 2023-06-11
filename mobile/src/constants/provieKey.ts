import type { InjectionKey } from 'vue'

export const NOTICE = Symbol('notice') as InjectionKey<{
  setMessage: (target: string, type?: 'error' | 'success') => void
  setVisible: (target?: boolean) => void
}>
