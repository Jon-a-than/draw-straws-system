import { describe, it } from 'vitest'

import { mount } from '@vue/test-utils'

import Button from '../Button'

describe('Button', () => {
  it('should render correctly', ({ expect }) => {
    const wrapper = mount(Button, {
      props: { icon: 'i-logos-vitest' },
      slots: { default: 'Button' }
    })

    expect(wrapper.text()).toContain('Button')
    expect(wrapper.element.innerHTML).toContain('<i class="i-logos-vitest"></i>')
  })
})
