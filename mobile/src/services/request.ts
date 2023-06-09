import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'

export const alovaInstance = createAlova({
  baseURL: 'http://localhost:4936',
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),

  beforeRequest(method) {
    method.config.headers['Content-Type'] = 'application/json'
  },

  responded: (response: Response) => response.json()
})
