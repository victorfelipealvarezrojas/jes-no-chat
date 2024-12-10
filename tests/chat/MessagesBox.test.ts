import { mount } from '@vue/test-utils'
import MessagesBox from '@/chat/MessagesBox.vue'

describe('MessageBox', () => {
  test('renders input and button elements correctly', () => {
    const wrapper = mount(MessagesBox)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('button svg').exists()).toBe(true)
  })

  test('emits message when button is clicked', async () => {
    const wrapper = mount(MessagesBox)
    const message = 'Hello World'
    const input = await wrapper.find('input[type="text"]').setValue(message)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.emitted('sendMessage')).toEqual([[message]])
    expect((wrapper.vm as any).message).toBe('')
  })

  test('emits message when enter is pressed', async () => {
    const wrapper = mount(MessagesBox)
    const message = 'Hello World'
    const input = wrapper.find('input[type="text"]')
    await input.setValue(message)
    await input.trigger('keyup.enter')
    expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message])
    expect((wrapper.vm as any).message).toBe('')
  })

  test('Not emits message when enter is pressed', async () => {
    const wrapper = mount(MessagesBox)
    const message = ''
    const input = wrapper.find('input[type="text"]')
    await input.setValue(message)
    await input.trigger('keyup.enter')
    expect(wrapper.emitted('sendMessage')).toBeFalsy()
    expect((wrapper.vm as any).message).toBe('')
  })
})
