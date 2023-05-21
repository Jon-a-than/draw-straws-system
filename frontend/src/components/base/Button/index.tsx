import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: false
    }
  },
  setup(props, { slots }) {
    return () => (
      <button bg="#c04851" border="solid #f1939c" rounded text="amber lg" font-bold>
        {props.icon && <i class={props.icon} />}
        {slots.default && slots.default()}
      </button>
    )
  }
})
