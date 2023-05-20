import './index.scss'

import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

type NavButtonProps = {
  icon: string
  lable: string
  path: string
}

export default defineComponent({
  setup() {
    const navButtons: NavButtonProps[] = [
      {
        icon: 'i-bx-list-plus',
        lable: '创建',
        path: '/create'
      },
      {
        icon: 'i-bx-planet',
        lable: '抽签',
        path: '/'
      },
      {
        icon: 'i-bx-network-chart',
        lable: '结果',
        path: '/report'
      }
    ]

    return () => (
      <footer h-12 bg-gray-100 flex="~ justify-around items-stretch">
        {navButtons.map(({ icon, lable, path }) => (
          <RouterLink class="tabbar-btn" to={path}>
            <i text="black 4xl" class={icon} />
            <span text="xs black" font-bold>
              {lable}
            </span>
          </RouterLink>
        ))}
      </footer>
    )
  }
})
