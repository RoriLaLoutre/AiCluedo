<script setup lang="ts">
import { ref } from 'vue'
import type { UIMessage } from 'ai'

const messages = ref<UIMessage[]>([
  {
    id: crypto.randomUUID(),
    role: 'assistant',
    parts: [{ type: 'text', text: 'Hello 👋 I am your virtual assistant.' }]
  }
])

const input = ref('')

function sendMessage() {
  if (!input.value.trim()) return

  // Ajouter le message utilisateur
  messages.value.push({
    id: crypto.randomUUID(),
    role: 'user',
    parts: [{ type: 'text', text: input.value }]
  })

  input.value = ''
}
</script>

<template>
  <div class="max-w-xl mx-auto flex flex-col h-[80vh] border rounded-2xl shadow-sm bg-white">
    <div class="flex-1 overflow-y-auto p-4">
      <UChatMessages :messages="messages" />
    </div>

    <div class="p-3 border-t flex gap-2">
      <UInput v-model="input" placeholder="Type your message..." class="flex-1" @keyup.enter="sendMessage" />
      <UButton icon="i-lucide-send" color="primary" @click="sendMessage">Send</UButton>
    </div>
  </div>
</template>
