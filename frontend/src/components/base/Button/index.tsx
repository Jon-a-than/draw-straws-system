import { defineComponent, type ButtonHTMLAttributes } from 'vue'

type ButtonProps = ButtonHTMLAttributes<void> & {
  icon?: string
  onClick?: Function
  [key: string]: any
}

export default defineComponent(
  (props: ButtonProps, { slots }) => {
    return () => (
      <button bg="#c04851" border="solid #f1939c" rounded text="amber lg" font-bold>
        {props.icon && <i class={props.icon} />}
        {slots.default && slots.default()}
      </button>
    )
  },
  {
    props: ['icon']
  }
)
