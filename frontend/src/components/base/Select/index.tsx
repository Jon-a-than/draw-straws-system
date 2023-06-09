import { defineComponent, ref, Teleport } from 'vue'

type SelectProps = {
  selection: {
    label?: string
    value: string | number
  }[]
}

export default defineComponent(
  (props: SelectProps, { slots }) => {
    const selected = ref(0)

    const opttionsVisible = ref(false)
    const handleHover = () => {
      opttionsVisible.value = true
    }

    return () => (
      <div class="select">
        <div
          onMouseenter={handleHover}
          border="solid #f1939c"
          flex="~ items-center justify-between"
          text="amber lg"
          class="h-10 w-full bg-#c04851 px-4 font-bold"
        >
          {slots.default?.() ?? <i />}
          <span>{props.selection[selected.value].label}</span>
          <i i-typcn-arrow-sorted-down />
        </div>

        <Teleport to="body">
          <ul bg="#c04851" border="solid #f1939c" my-0 pa-0 list-none rounded>
            {props.selection.map(({ label }, index) => (
              <li>
                <button
                  text="amber hover:black lg"
                  class="h-10 w-full border-none font-bold"
                  bg="transparent hover:#f07c82 active:#f1939c"
                  transition="colors 0.2s"
                  border-t={index && '#f1939c solid 3'}
                  onClick={() => (selected.value = index)}
                  type="button"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </Teleport>
      </div>
    )
  },
  {
    props: ['selection']
  }
)
