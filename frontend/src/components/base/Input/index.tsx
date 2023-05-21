import { defineComponent } from 'vue'

interface InputProps {
  modelValue?: string
  type?: string
  placeholder?: string
}

export default defineComponent({
  props: ['placeholder', 'type', 'modelValue'],
  setup(props: InputProps, { slots, emit }) {
    function handleInput({ target }: InputEvent) {
      emit('update:modelValue', (target as HTMLInputElement).value)
    }

    return () => (
      <span
        class="qs-button"
        inline-flex
        rounded
        border="solid #f1939c"
        bg="#c04851 focus-within:#f07c82"
      >
        <span inline-flex justify-center items-center h-full>
          {!!slots.prefix && slots.prefix()}
        </span>
        <input
          value={props?.modelValue}
          onInput={handleInput}
          type={props?.type ?? 'text'}
          focus:outline-none
          font-bold
          text="amber lg focus:black"
          bg-transparent
          border-none
          flex-1
          placeholder={props?.placeholder ?? '请输入'}
        />
      </span>
    )
  }
})
