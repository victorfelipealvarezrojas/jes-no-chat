import { ref } from 'vue'
import type { ChatMessage } from '@/interfaces/chat-messages.interfaces'
import type { YesNoResponse } from '@/interfaces/yes-no.response'
import { sleep } from '@/helpers/sleep'

export const useChat = () => {
  const messages = ref<ChatMessage[]>([])

  const getResponse = async (): Promise<YesNoResponse> => {
    const response = await fetch(`https://yesno.wtf/api`)
    const data = (await response.json()) as YesNoResponse
    return data
  }

  const onNewMessage = async (message: string) => {
    if (message.length === 0) return

    messages.value.push({
      id: new Date().getTime(),
      message,
      itsMine: true,
    })

    if (!message.endsWith('?')) return

    sleep(1)

    const { answer, image } = await getResponse()

    messages.value.push({
      id: new Date().getTime(),
      message: answer,
      itsMine: false,
      image,
    })
  }

  return {
    messages,
    onNewMessage,
  }
}
