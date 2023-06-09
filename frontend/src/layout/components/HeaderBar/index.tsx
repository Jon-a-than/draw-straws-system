import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    const handleBack = () => router.back()

    return () => (
      <header bg="#c04851" h-12 grid="~ cols-3 justify-center items-stretch">
        <button
          onClick={handleBack}
          v-show={route.meta.showBack}
          bg-transparent
          border-none
          text="start 3xl amber"
        >
          <i i-bx-left-arrow-alt />
        </button>
        <span font-bold grid="col-start-2 self-center" text="xl amber center">
          {route.meta.title}
        </span>
        <button bg-transparent border-none text="end 3xl amber"></button>
      </header>
    )
  }
})
