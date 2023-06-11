import { computed, defineComponent, inject } from 'vue'

import { NOTICE } from '@/constants/provieKey'
import { TabBar, TabBarItem } from 'tdesign-mobile-vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent(() => {
  const route = useRoute()
  const router = useRouter()

  const { setVisible } = inject(NOTICE)!
  async function handleNavigate(to: string | number) {
    setVisible(false)
    await router.push(to as string)
  }

  const routePath = computed(() => route.meta.defaultPath as string)

  const navLinks = [
    {
      text: '创建',
      icon: 'i-bx-list-plus',
      to: '/create-pool'
    },
    {
      text: '抽签',
      icon: 'i-bx-planet',
      to: '/draw-straws'
    },
    {
      text: '查询',
      icon: 'i-bx-network-chart',
      to: '/search'
    }
  ]

  return () => (
    <TabBar
      theme="tag"
      split={false}
      fixed={false}
      value={routePath.value}
      onChange={handleNavigate}
    >
      {navLinks.map(({ text, icon, to }) => (
        <TabBarItem key={to} value={to} icon={() => [<i class={icon} />]}>
          {text}
        </TabBarItem>
      ))}
    </TabBar>
  )
})
