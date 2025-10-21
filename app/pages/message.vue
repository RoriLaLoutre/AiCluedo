<template>


<div class="flex-1 overflow-y-auto p-4">
    <UChatMessages
        :messages="messages"
        :assistant="{
        variant: 'solid',
        avatar: { icon: 'i-lucide-bot' },
        }"
        :user="{
            variant: 'solid',
            side: 'right',
        }"
    />
</div>

<div class="p-3 border-t flex gap-2 items-center">
    <UInput
        v-model="input"
        placeholder="Type your message..."
        class="flex-1"
        @keyup.enter="sendMessage"
    />
    <UButton color="primary" @click="sendMessage">Send</UButton>
    <UButton icon="i-lucide-arrow-up-from-line" color="primary" @click="sendMessage" />
</div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UIMessage } from 'ai'


const messages = ref<UIMessage[]>([
  {
    id: crypto.randomUUID(),
    role: 'assistant',
    parts: [{ type: 'text', text: "Salut ! Comment puis-je t’aider aujourd’hui ?" }]
  }
])

const input = ref('')

function sendMessage() {
  if (!input.value.trim()) return

  const userMessage: UIMessage = {
    id: crypto.randomUUID(),
    role: 'user',
    parts: [{ type: 'text', text: input.value.toString() }]
  }

  messages.value.push(userMessage)

  const messageContent = input.value
  input.value = ''

  setTimeout(() => {
    const assistantMessage: UIMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      parts: [{ type: 'text', text: `Vous avez dit : "${messageContent}"` }]
    }
    messages.value.push(assistantMessage)
  }, 500)
}

</script>

