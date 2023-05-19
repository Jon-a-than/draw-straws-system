import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerAttributifyJsx
} from 'unocss'

export default defineConfig({
  transformers: [transformerAttributifyJsx()],
  presets: [
    presetAttributify({ prefix: 'v:' }),
    presetIcons({
      cdn: 'https://cdn.jsdelivr.net/npm/',
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    }),
    presetUno()
  ]
})
