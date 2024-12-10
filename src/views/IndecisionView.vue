<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div class="bg-blue-500 p-4 text-white flex justify-between items-center">
      <span>Fake Api Response yes/no</span>
    </div>
    <ChatMessages :messages="messages" />
    <MessagesBox @send-message="onNewMessage($event)" />
  </div>
</template>

<script setup lang="ts">
import ChatMessages from '@/chat/ChatMessages.vue'
import MessagesBox from '@/chat/MessagesBox.vue'
import { useChat } from '@/composables/useChat'
const { messages, onNewMessage } = useChat()
</script>
