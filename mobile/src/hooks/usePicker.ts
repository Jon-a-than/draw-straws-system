import { ref } from 'vue'

export function usePicker() {
  const pickerVisible = ref<boolean>(false)
  const toggleVisible = () => (pickerVisible.value = !pickerVisible.value)

  return {
    pickerVisible,
    toggleVisible
  }
}
