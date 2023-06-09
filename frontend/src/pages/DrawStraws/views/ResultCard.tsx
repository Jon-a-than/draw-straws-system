import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { tag, title, name, role } = route.query
    console.log(route.query)

    return () => (
      <div flex="~ col justify-center items-center" bg="#f0c9cf" rounded>
        <h3>{title}</h3>
        <p>
          <span>{name}</span>
        </p>
        <p>
          <span>{tag}</span>
        </p>
        {role && (
          <p>
            <span>{role}</span>
          </p>
        )}
      </div>
    )
  }
})
