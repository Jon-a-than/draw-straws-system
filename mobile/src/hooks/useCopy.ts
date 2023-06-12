import { nextTick, ref } from 'vue'

export function useCopy() {
  const copyText = ref<string>('')
  const COPY = ref<HTMLInputElement>()

  function copy(text: string, callback?: () => unknown) {
    copyText.value = text
    nextTick(() => {
      COPY.value?.select()
      document.execCommand('copy')
      callback?.()
    })
  }

  return {
    copyText,
    COPY,
    copy
  }
}
