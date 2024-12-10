import { mount } from '@vue/test-utils'
import ChatMessages from '@/chat/ChatMessages.vue'
import type { ChatMessage } from '@/interfaces/chat-messages.interfaces'

const messages: ChatMessage[] = [
  { id: 1, message: 'Hello shiao', itsMine: true },
  { id: 2, message: 'World plop', itsMine: false },
  { id: 3, message: 'Hello World', itsMine: true },
]

describe('ChatMessages', () => {
  test('snapshot correctly ', () => {
    const wrapper = mount(ChatMessages, {
      props: { messages },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders messages correctly', () => {
    const wrapper = mount(ChatMessages, {
      props: { messages },
    })

    const chatBubble = wrapper.findAllComponents({ name: 'ChatBubble' })
    expect(chatBubble).toHaveLength(3)
  })

  test('scrolls to bottom when messages are updated', async () => {
    const wrapper = mount(ChatMessages, {
      props: { messages },
    })

    const scrollmock = vi.fn()
    const refScroll = wrapper.vm.$refs.chatRef as any
    refScroll.scrollTo = scrollmock

    await wrapper.setProps({
      messages: [
        ...messages,
        { id: 4, message: 'Hello shiao 4', itsMine: true },
        { id: 5, message: 'World plop 5', itsMine: false },
        { id: 6, message: 'Hello World 6', itsMine: true },
        { id: 7, message: 'Hello shiao 7', itsMine: true },
      ],
    })

    await new Promise((resolve) => setTimeout(resolve, 150))

    expect(scrollmock).toHaveBeenCalled()
  })
})
