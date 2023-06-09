import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerAttributifyJsx,
  transformerDirectives
} from 'unocss'

export default defineConfig({
  transformers: [transformerAttributifyJsx(), transformerDirectives()],
  presets: [
    presetAttributify({ prefix: 'v:' }),
    presetIcons({
      cdn: 'https://fastly.jsdelivr.net/npm/',
      extraProperties: { display: 'inline-block', 'vertical-align': 'middle' }
    }),
    presetUno()
  ],
  theme: {}
})
