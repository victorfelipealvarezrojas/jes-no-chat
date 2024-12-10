import { mount } from '@vue/test-utils'
import ChatBobble from '@/chat/ChatBubble.vue'

describe('ChatBobble', () => {
  test('reder message correctly', () => {
    const message = 'Hello World'
    const wrapper = mount(ChatBobble, {
      props: { message, itsMine: true },
    })

    expect(wrapper.text()).toContain(message)
    expect(wrapper.find('.bg-blue-200').text()).toContain(message)
    expect(wrapper.find('.bg-blue-200').exists()).toBeTruthy()
    expect(wrapper.find('.bg-blue-200').exists()).toBe(true)
    expect(wrapper.find('.bg-gray-300').exists()).toBeFalsy()
  })

  test('reder received message correctly', () => {
    const message = 'Hello World'
    const wrapper = mount(ChatBobble, {
      props: { message, itsMine: false },
    })

    expect(wrapper.text()).toContain(message)
    expect(wrapper.find('.bg-gray-300').text()).toContain(message)
    expect(wrapper.find('.bg-gray-300').exists()).toBeTruthy()
    expect(wrapper.find('.bg-gray-300').exists()).toBe(true)
    expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy()
    expect(wrapper.find('img').exists()).toBe(false)
  })

  test('reder received message with image', () => {
    const message = 'Hello World'
    const image = '150.jpg'
    const wrapper = mount(ChatBobble, {
      props: {
        message,
        itsMine: false,
        image: image,
      },
    })

    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe(image)
  })
})
