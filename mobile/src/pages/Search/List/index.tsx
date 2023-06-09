import { defineComponent, ref } from 'vue'

import { Button, Form, FormItem, Input } from 'tdesign-mobile-vue'

export default defineComponent(() => {
  const uuidWithType = ref<string>('')

  return () => (
    <>
      <Form mt-4>
        <FormItem label="奖池口令" name="uuid">
          <Input v-modle={uuidWithType.value} />
        </FormItem>
        <div pa-4>
          <Button theme="primary" type="submit" block>
            查看奖池
          </Button>
        </div>
      </Form>
    </>
  )
})
