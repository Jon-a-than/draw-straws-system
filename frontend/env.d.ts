/// <reference types="vite/client" />
import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'vue' {
  interface HTMLAttributes<_T> extends AttributifyAttributes {}
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, any>
  export default component
}
