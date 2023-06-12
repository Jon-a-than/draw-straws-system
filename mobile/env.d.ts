/// <reference types="vite/client" />

import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'vue' {
  interface HTMLAttributes<_T> extends AttributifyAttributes {}
  interface InputHTMLAttributes<_T> extends AttributifyAttributes {}
}
