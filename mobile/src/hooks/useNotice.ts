import { ref } from 'vue'

export function useNotice() {
  const visible = ref<boolean>(false)
  function setVisible(target?: boolean) {
    visible.value = target ?? !visible.value
  }

  const message = ref<string>('')
  function setMessage(target: string, type?: 'success' | 'error') {
    setType(type ?? 'success')
    message.value = target
    visible.value = true
  }

  const type = ref<'success' | 'error'>('success')
  function setType(target: 'success' | 'error') {
    type.value = target
  }

  return {
    visible,
    setVisible,
    message,
    setMessage,
    type
  }
}
